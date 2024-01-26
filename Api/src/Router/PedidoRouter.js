const { Router } = require('express');

const PedidoController = require('../Controller/PedidoController');

const { validarErrores } = require("../Middlewares");
const { idRequired } = require('../Middlewares/ParamsMiddleware');
const { checkSession, checkSessionAdmin } = require('../Auth/checkSession');

const PedidoRouter = Router();

PedidoRouter.get("/getAll", PedidoController.getAll);

PedidoRouter.get("/getPedidosSinProcesar", PedidoController.getPedidosSinProcesar);

PedidoRouter.post("/generarPedido", [checkSession, validarErrores], PedidoController.generarPedido);

PedidoRouter.post("/procesarPedido/:id", [checkSessionAdmin, idRequired, validarErrores], PedidoController.procesarPedido);


module.exports = PedidoRouter;
