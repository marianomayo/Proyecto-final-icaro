const db = require("../db");
const { QueryTypes } = require("sequelize");

const addToCart = (idOrder, vObj) => {
    return db.query(
        `INSERT INTO orden_compra_x_producto (id_orden_compra, id_producto, ncantidad) 
            VALUES ('${idOrder}', '${vObj.id_producto}', 1)`
      );
}



const editCart = (idOrder, vObj) => {   
    return db.query(
        `UPDATE orden_compra_x_producto SET ncantidad = ncantidad + 1 
          WHERE id_orden_compra = ${idOrder} and id_producto = ${vObj.id_producto}`
    );
}


const deleteProductOrder = (idOrdenCompraProducto) => {
    return db.query(
      `delete from orden_compra_x_producto WHERE idorden_compra_x_producto = ${idOrdenCompraProducto}`
    );
}

const productsOrder = (idOrder) => {
    return db.query(
        `select * from orden_compra_x_producto where id_orden_compra = ${idOrder}`,{
            type: QueryTypes.SELECT
        }
    );
}

const productoInOrder = (idOrder, idProduc) => {
    return db.query(
        `select * from orden_compra_x_producto where id_orden_compra = ${idOrder} and id_producto = ${idProduc}`,{
            type: QueryTypes.SELECT
        }
    );
}



module.exports = { addToCart, editCart, deleteProductOrder, productoInOrder , productsOrder};