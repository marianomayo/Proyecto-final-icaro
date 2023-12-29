const { Router } = require('express');

const OrdenCompraController = require('../Controller/OrdenCompraController');

const OrderRouter = Router();

const { validarErrores } = require("../Middlewares");
const { checkSession } = require('../Auth/checkSession');


OrderRouter.post("/addProductToCart", [checkSession, validarErrores], OrdenCompraController.addToCart);

OrderRouter.post("/deleteProduct", [checkSession, validarErrores], OrdenCompraController.deleteProductCart);

OrderRouter.get("/getUserOrder", [checkSession, validarErrores], OrdenCompraController.getUserOrderInProcess);

module.exports = OrderRouter;

