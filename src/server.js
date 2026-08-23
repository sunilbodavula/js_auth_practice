require("dotenv").config();

const app = require("./app");
const pool = require("./config/database");
const redisClient = require("./config/redis");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try{
        await pool.connect();
        console.log("Database connected successfully");

        await redisClient.connect();
        console.log("Redis connected successfully");

        await redisClient.set("test", "Hello, World");
        const value = await redisClient.get("test");
        console.log("Redis test value: ", value);

        app.listen(PORT, () => {
            console.log(`Server is runnig on port ${PORT}`);
        });

    }catch(error){
        console.error("Error connecting to the database:", error);
        process.exit(1);
    }
}

startServer();

