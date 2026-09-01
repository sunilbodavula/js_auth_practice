const bcrypt = require("bcrypt");
const userRepository = require("../repositories/user.repository");
const AppError = require("../utils/AppError");
const { 
    generateAccessToken,
    generateRefreshToken,
    generateSessionId,
    hashToken
 } = require("../utils/genToken");
const sessionRepository = require("../repositories/session.repository");


const REFRESH_TOKEN_EXPIRES_IN = 7 * 24 * 60 * 60; // 7 days in seconds
const saltRounds = 12;

const registerUser = async (name, email, password) => {

    const existingUser = await userRepository.findByEmail(email);

    if (existingUser) {
        throw new AppError(
            "Email already exists",
            409
        );
    }

    const passwordHash = await bcrypt.hash(password, saltRounds);

    const newUser = await userRepository.createUser(name, email, passwordHash);

    return newUser;
};

const loginUser = async (email, password) => {

    const user = await userRepository.findByEmail(email);

    if(!user){
        throw new AppError(
            "Invalid email or password",
            401
        );
    }

    const passwordMathces = await bcrypt.compare(password, user.password_hash);

    if(!passwordMathces){
        throw new AppError(
            "Invalid email or password",
            401
        );
    }

    if(!user.is_active){
        throw new AppError(
            "User account is not active",
            403
        );
    }

    const accessToken = generateAccessToken(user.id);

    const refreshSecret = generateRefreshToken();

    const sessionId = generateSessionId();

    const refreshToken = `${sessionId}.${refreshSecret}`;

    const tokenHash = hashToken(refreshSecret);

    await sessionRepository.createSession(
        sessionId,
        {
            userId: user.id,
            tokenHash
        },
        REFRESH_TOKEN_EXPIRES_IN
    )

    return {
        accessToken,
        refreshToken,
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        }
    }
}

const refreshAccessToken = async (refreshToken) => {

    const parts = refreshToken.split(".");

    if(parts.length !== 2){
        throw new AppError(
            "Invalid refresh token",
            401
        )
    }

    const [sessionId, refreshSecret] = parts;

    const session = await sessionRepository.getSession(sessionId);

    if(!session){
        throw new AppError(
            "Invalid refresh token",
            401
        )
    }

    const incomingTokenHash = hashToken(refreshSecret);

    if(incomingTokenHash !== session.tokenHash){
        throw new AppError(
            "Invalid refresh token",
            401
        )
    }

    await sessionRepository.deleteSession(sessionId);

    const newAccessToken = generateAccessToken(session.userId);

    const newRefreshSecret = generateRefreshToken();

    const newSessionId = generateSessionId();

    const newRefreshToken = `${newSessionId}.${newRefreshSecret}`;

    const newTokenHash = hashToken(newRefreshSecret);

    await sessionRepository.createSession(
        newSessionId,
        {
            userId: session.userId,
            tokenHash: newTokenHash
        },
        REFRESH_TOKEN_EXPIRES_IN
    );

    return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken
    };

};

module.exports = {
    registerUser,
    loginUser,
    refreshAccessToken
};