const db = require("../db");
const { QueryTypes } = require("sequelize");

const getOrderUserInProcess = ( current_user) => {
    return db.query( `SELECT * FROM orden_compra WHERE id_usuario = ${current_user} and bprocesado = false`,{
      type: QueryTypes.SELECT,
    });
}


const initOrder = async (current_user) => {
    const result = await db.query(
        `INSERT INTO orden_compra (id_usuario) VALUES (${current_user})`
    );
    const orderId = result[0];
    return orderId;
};

module.exports = { getOrderUserInProcess, initOrder };