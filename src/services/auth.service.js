const bcrypt = require("bcrypt");
const userRepository = require("../repositories/user.repository");
const AppError = require("../utils/AppError");

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

    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        }
    }
}

module.exports = {
    registerUser,
    loginUser
};