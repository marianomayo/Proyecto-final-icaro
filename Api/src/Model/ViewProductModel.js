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

const getPrecioMinimoYMaximo = async () => {
    try {
        const result = await db.query(
          "SELECT MIN(fpreciooferta) AS precio_minimo, MAX(fpreciooferta) AS precio_maximo FROM view_producto",
          {
            type: QueryTypes.SELECT,
          }
        );
       
        return result[0]; 
      } catch (error) {
        console.error('Error al obtener el precio mínimo y máximo:', error);
        throw error;
      }
}


module.exports = { getAll, getProductById, getPrecioMinimoYMaximo}