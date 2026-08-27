const authService = require("../services/auth.service");

const register = async (req, res) => {
    try{
        const {name, email, password} = req.body;

        const user = await authService.registerUser(name, email, password);
        
        res.status(201).json({
            message: "User registered successfully",
            user
        })  
    }catch(error){
        console.error(error);

        if(error.message === "User with this email already exists"){
            return res.status(400).json({
                message: error.message
            })

        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}
}

module.exports = {
    register
};