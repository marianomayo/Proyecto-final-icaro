const db = require("../db");

const { QueryTypes } = require("sequelize");

const getAll = () => {
    return db.query("SELECT * FROM marca", {
        type: QueryTypes.SELECT,
    });
}

const getBrandById = (id) => {
    return db.query(`SELECT * FROM marca WHERE id_marca = ${id}`, {
        type: QueryTypes.SELECT,
    });
}

module.exports = {getAll, getBrandById}