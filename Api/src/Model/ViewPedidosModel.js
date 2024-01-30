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

const getPedidosUsuario = (current_user) => {
  return db.query( `SELECT * FROM view_pedido where id_usuario = ${current_user}`,{
    type: QueryTypes.SELECT,
  });
}

const getPedidosProcesadosSinNotificar = (current_user) => {
  return db.query( `SELECT * FROM view_pedido where id_usuario = ${current_user} and bprocesado = 1 and bnotificado = 0 `,{
    type: QueryTypes.SELECT,
  });
}



module.exports = { getPedidosSinProcesar, getPedidos, getPedidosUsuario, getPedidosProcesadosSinNotificar };