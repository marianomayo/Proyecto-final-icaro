const { Router } = require('express');

const OrdenCompraController = require('../Controller/OrdenCompraController');
const PedidoController = require('../Controller/PedidoController');
const OrderRouter = Router();

const { validarErrores } = require("../Middlewares");
const { checkSession, checkSessionAdmin } = require('../Auth/checkSession');
const { idRequired } = require('../Middlewares/ParamsMiddleware');


OrderRouter.post("/addProductToCart", [checkSession, validarErrores], OrdenCompraController.addToCart);

OrderRouter.post("/deleteProduct", [checkSession, validarErrores], OrdenCompraController.deleteProductCart);

OrderRouter.get("/getUserOrder", [checkSession, validarErrores], OrdenCompraController.getUserOrderInProcess);

OrderRouter.get("/getArticulosOrden/:id", [checkSessionAdmin, idRequired, validarErrores], PedidoController.getArticulosOrden);


module.exports = OrderRouter;

