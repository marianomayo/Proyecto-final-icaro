const db = require("../db");
const { QueryTypes } = require("sequelize");

const getAll = () => {
    return db.query("SELECT * FROM view_producto", {
        type: QueryTypes.SELECT,
    });
}

const getProductById = (id) => {
    return db.query(`SELECT * FROM view_producto where id_producto = ${id}`, {
        type: QueryTypes.SELECT,
    });
}


module.exports = { getAll, getProductById}