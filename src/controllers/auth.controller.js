const authService = require("../services/auth.service");

const register = async (req, res) => {
    const {name, email, password} = req.body;

    const user = await authService.registerUser(name, email, password);
        
    res.status(201).json({
        message: "User registered successfully",
        user
    });
};

module.exports = {
    register
};