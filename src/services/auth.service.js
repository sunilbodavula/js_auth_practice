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
}

module.exports = {
    registerUser
};