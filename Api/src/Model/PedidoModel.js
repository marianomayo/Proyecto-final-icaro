const db = require("../db");
const { QueryTypes } = require("sequelize");

const getAll = ( current_user) => {
    return db.query( `SELECT * FROM pedido`,{
      type: QueryTypes.SELECT,
    });
}


const generarPedido = async (vObj) => {
    const result = await db.query(
        `INSERT INTO pedido (id_orden_compra, ftotal, benvio) VALUES (${vObj.id_orden_compra}, ${vObj.ftotal}, ${vObj.benvio})`
    );
    const orderId = result[0];
    return orderId;
};

const procesarPedido = (idPedido) => {
    return db.query(
        `UPDATE pedido set bprocesado = 1 where idpedido = ${idPedido}`
    );
   
};

const procesarPedidoNotificacion = (idsOrden) => {
    return db.query(
        `UPDATE pedido set bnotificado = 1 where id_orden_compra in (${idsOrden})`
    );
   
};

module.exports = { getAll, generarPedido, procesarPedido, procesarPedidoNotificacion };