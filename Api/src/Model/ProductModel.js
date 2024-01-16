const db = require("../db");
const { QueryTypes } = require("sequelize");

const getAll = () => {
    return db.query("SELECT * FROM producto", {
        type: QueryTypes.SELECT,
    });
}

const getProductById = (id) => {
    return db.query(`SELECT * FROM producto where id_producto = ${id}`, {
        type: QueryTypes.SELECT,
    });
}

const addProduct = (vObj, current_admin) => {   
    return db.query(
        `INSERT INTO producto (vnombre, tdescripcion, fprecio, nusuariocreador, id_marca, id_categoria, ncantidad) 
            VALUES ('${vObj.nombre}', '${vObj.descripcion}', '${vObj.fprecio}', '${current_admin}', '${vObj.nmarca}', '${vObj.idcategoria}', '${vObj.ncantidad}')`
      );
}

const editProduct = (id, vObj) => {
    return db.query(
      `UPDATE producto SET vnombre = '${vObj.vnombre}', tdescripcion = '${vObj.tdescripcion}', fprecio = ${vObj.fprecio}, id_marca = ${vObj.id_marca}, id_categoria = ${vObj.idcategoria}, ncantidad = ${vObj.ncantidad}, boferta = ${vObj.boferta}, tsofertahasta = '${vObj.tsofertahasta}', bhabilitado = '${vObj.bhabilitado}' WHERE id_producto = ${id}`
    );
}

const editCantidad = (id, cantidad) => {
    return db.query(
      `UPDATE producto SET ncantidad = ncantidad - '${cantidad}' WHERE id_producto = ${id}`
    );
}




module.exports = { getAll, getProductById, addProduct, editProduct, editCantidad }