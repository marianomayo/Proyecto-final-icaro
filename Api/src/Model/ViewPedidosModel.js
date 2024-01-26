const db = require("../db");
const { QueryTypes } = require("sequelize");


const getPedidosSinProcesar = () => {
    return db.query( `SELECT * FROM view_pedido where bprocesado = 0`,{
      type: QueryTypes.SELECT,
    });
}

const getPedidos = () => {
  return db.query( `SELECT * FROM view_pedido`,{
    type: QueryTypes.SELECT,
  });
}




module.exports = { getPedidosSinProcesar, getPedidos };