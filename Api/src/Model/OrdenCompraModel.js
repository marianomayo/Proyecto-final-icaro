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

const updateOrder = async ( id_orden_compra) => {
    const result = await db.query(
        `UPDATE orden_compra set bprocesado = 1, tsprocesado = NOW() where idorden_compra = ${id_orden_compra}`
    );
    
    return result;
};

module.exports = { getOrderUserInProcess, initOrder, updateOrder };