const db = require("../db");
const { QueryTypes } = require("sequelize");

const getCategorias = () => {
    return db.query(`select * from categoria`,{
        type: QueryTypes.SELECT
    })
}

const getCategoriaById = (nCategoria) => {
    return db.query(`select * from categoria where idcategoria = ${nCategoria}`,{
        type: QueryTypes.SELECT
    })
}

module.exports = { getCategorias, getCategoriaById };