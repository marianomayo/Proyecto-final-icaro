const { Router } = require('express');

const FavoritoController = require('../Controller/FavoritoController');
const FavoritoRouter = Router();

const { validarErrores } = require("../Middlewares");
const { checkSession, checkSessionAdmin } = require('../Auth/checkSession');


FavoritoRouter.post("/addProductToFav", [checkSession, validarErrores], FavoritoController.addToFav);

FavoritoRouter.post("/deleteProductFav", [checkSession, validarErrores], FavoritoController.deleteProductFav);

FavoritoRouter.get("/getFavByUser", [checkSession, validarErrores], FavoritoController.getFavByUser);



module.exports = FavoritoRouter;

