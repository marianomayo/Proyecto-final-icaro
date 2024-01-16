const { Router } = require('express');

const ProductController = require('../Controller/ProductController');

const { validarErrores } = require("../Middlewares");
const { idRequired } = require('../Middlewares/ParamsMiddleware');
const { validateName, validateDescription, validatePrice, validateBrand, validateCategoria, existCategoria, existMarca } = require('../Middlewares/ProductMiddleware');
const { checkSessionAdmin } = require('../Auth/checkSession');

const ProductRouter = Router();

ProductRouter.get("/getAll", ProductController.getAll);

ProductRouter.post("/addProduct", [checkSessionAdmin, validateName, validateDescription, validatePrice, validateBrand, validateCategoria, existCategoria, existMarca, validarErrores], ProductController.addProduct);

/**Tener en cuenta que si el id no se encuentra que avise al usuario, chequear cantidades*/
ProductRouter.put("/editProduct/:id", [checkSessionAdmin, idRequired, validateName, validateDescription,  validatePrice, validateBrand, validateCategoria, existCategoria, existMarca, validarErrores], ProductController.editProduct);

ProductRouter.get("/getProductById/:id", [idRequired, validarErrores], ProductController.getProductById);

ProductRouter.get("/getPrecioMinimoYMaximo",  ProductController.getPrecioMinimoYMaximo);

ProductRouter.get("/getComentariosById/:id", [idRequired, validarErrores], ProductController.getComentariosById);

module.exports = ProductRouter;
