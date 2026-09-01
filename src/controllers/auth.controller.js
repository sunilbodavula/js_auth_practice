const authService = require("../services/auth.service");

const register = async (req, res) => {
    const {name, email, password} = req.body;

    const user = await authService.registerUser(name, email, password);
        
    res.status(201).json({
        message: "User registered successfully",
        user
    });
};

const login = async (req, res) => {
    const {email, password} = req.body;

    const result = await authService.loginUser(email, password);

    res.status(200).json({
        message: "User logged in successfully",
        ...result
    });
};

module.exports = {
    register,
    login
};