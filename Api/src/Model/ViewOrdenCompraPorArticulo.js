const db = require("../db");
const { QueryTypes } = require("sequelize");

const getAll = () => {
    return db.query("SELECT * FROM view_orden_compra_x_articulo", {
        type: QueryTypes.SELECT,
    });
}

const getProductInOrderByUserActive = ( idOrder, current_user) => {
    return db.query(`SELECT * FROM view_orden_compra_x_articulo WHERE id_usuario = ${current_user} and id_orden_compra = ${idOrder}`, {
        type: QueryTypes.SELECT,
    });
}

const getProductCartByUser = (current_user, id_product) => {
    return db.query(`SELECT * FROM view_orden_compra_x_articulo WHERE id_producto = ${id_product} and id_usuario = ${current_user}`, {
        type: QueryTypes.SELECT,
    });
}

const getCartByUser = (current_user) => {
    return db.query(`SELECT * FROM view_orden_compra_x_articulo where id_usuario = ${current_user}`, {
        type: QueryTypes.SELECT,
    });
}

const getArticulosOrden = (idOrder) => {
    return db.query(`SELECT * FROM view_orden_compra_x_articulo where id_orden_compra = ${idOrder}`, {
        type: QueryTypes.SELECT,
    });
}


module.exports = { getAll, getCartByUser, getProductCartByUser, getProductInOrderByUserActive, getArticulosOrden}