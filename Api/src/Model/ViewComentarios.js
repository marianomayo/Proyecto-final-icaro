const db = require("../db");
const { QueryTypes } = require("sequelize");

const getComentariosProducto = (idProducto) => {
    return db.query(`SELECT * FROM view_comentarioxproducto where id_producto = ${idProducto}`, {
        type: QueryTypes.SELECT,
    });
}


module.exports = { getComentariosProducto }