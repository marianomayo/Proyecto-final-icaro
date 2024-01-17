const { Router } = require('express');

const PedidoController = require('../Controller/PedidoController');

const { validarErrores } = require("../Middlewares");
const { checkSession } = require('../Auth/checkSession');

const PedidoRouter = Router();

PedidoRouter.get("/getAll", PedidoController.getAll);

PedidoRouter.post("/generarPedido", [checkSession, validarErrores], PedidoController.generarPedido);


module.exports = ProductRouter;
