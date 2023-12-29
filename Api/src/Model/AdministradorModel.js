const db = require("../db");
const { QueryTypes } = require("sequelize");

const getAdmin = async (email) => {
    try {
        const result = await db.query(`SELECT * FROM administrador WHERE vemail = '${email}'`, {
            type: QueryTypes.SELECT,
        });
        return result;
    } catch (error) {
        throw error;
    }
};



module.exports = {getAdmin}