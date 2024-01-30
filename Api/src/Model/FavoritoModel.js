const db = require("../db");
const { QueryTypes } = require("sequelize");

const getAllByUser = (current_user) => {
    return db.query( `SELECT * FROM view_favorito where id_usuario = ${current_user}`,{
      type: QueryTypes.SELECT,
    });
}

const addToFav = (idProducto, current_user) => {
    return db.query( `INSERT INTO favorito (id_producto, id_usuario) VALUES (${idProducto}, ${current_user})`);
}

const deleteFav = (idProducto, current_user) => {
    return db.query( `DELETE FROM favorito WHERE id_producto = ${idProducto} and id_usuario = ${current_user}`);
}

const getFavByUserAndProduct = ( current_user, id_producto) => {
    return db.query( `SELECT * FROM view_favorito where id_usuario = ${current_user} and id_producto = ${id_producto}`,{
      type: QueryTypes.SELECT,
    });
}



module.exports = { getAllByUser, addToFav, deleteFav, getFavByUserAndProduct };