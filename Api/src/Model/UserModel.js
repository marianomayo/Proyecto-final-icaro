const db = require("../db");
const { QueryTypes } = require("sequelize");

const getUser = async (email) => {
    try {
        const result = await db.query(`SELECT * FROM usuario WHERE vemail = '${email}'`, {
            type: QueryTypes.SELECT,
        });
        return result;
    } catch (error) {
        throw error;
    }
};

const addUser = async (vUser) => {
    try {
        const result = await db.query(
            `INSERT INTO usuario (vnombre, vapellido, dnacimiento, vdireccion, nnumero, vdepto, vemail, vpassword) 
            VALUES ('${vUser.nombre}', '${vUser.apellido}', '${vUser.nacimiento}', '${vUser.direccion}', '${vUser.numero}', '${vUser.depto}', '${vUser.email}', '${vUser.password}')`
        );
       return result;
    } catch (error) {
        throw error;
    }
};

module.exports = {getUser, addUser}