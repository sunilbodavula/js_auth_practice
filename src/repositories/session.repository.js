const redisClient = require("../config/redis");

const createSession = async (
    sessionId,
    sessionData,
    expiresIn
) => {
    const key = `refresh_session:${sessionId}`;

    await redisClient.set(
        key,
        JSON.stringify(sessionData),
        {
            EX: expiresIn
        }
    );
};

const getSession = async (sessionId) => {

    const key = `refresh_session:${sessionId}`;

    const data = await redisClient.get(key);

    if(!data){
        return null
    };

    return JSON.parse(data);
}

const deleteSession = async (sessionId) => {

    const key = `refresh_session:${sessionId}`;

    await redisClient.del(key);
}

module.exports = {
    createSession,
    getSession,
    deleteSession
};