const db = require("../db");
const { QueryTypes } = require("sequelize");

const getOrderUserInProcess = ( current_user) => {
  return db.query( `SELECT * FROM orden_compra WHERE id_usuario = ${current_user} and bprocesado = true`,{
    type: QueryTypes.SELECT,
  });
}

const addToCart = (vObj, current_user) => {
    return db.query(
        `INSERT INTO orden_compra (id_usuario, id_producto, ncantidad) 
            VALUES ('${current_user}', '${vObj.id_producto}', '${vObj.ncantidad}')`
      );
}

const editCart = (vObj, current_user) => {
    return db.query(
      `UPDATE orden_compra SET ncantidad = '${vObj.ncantidad}' 
        WHERE idcarro_de_compra = ${vObj.idcarro_de_compra} and id_producto = ${vObj.id_producto} and id_usuario = ${current_user}`
    );
}

const deleteCart = (id_cart, current_user) => {
    return db.query(
      `delete orden_compra WHERE idcarro_de_compra = ${id_cart} and id_usuario = ${current_user}`
    );
}



module.exports = {getOrderUserInProcess }