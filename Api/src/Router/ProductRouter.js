const { Router } = require('express');

const ProductController = require('../Controller/ProductController');

const { validarErrores } = require("../Middlewares");
const { idRequired } = require('../Middlewares/ParamsMiddleware');
const { validateName, validateDescription, validatePrice, validateBrand, validateCategoria } = require('../Middlewares/ProductMiddleware');

const ProductRouter = Router();

ProductRouter.get("/getAll", ProductController.getAll);

/**Recordar agregar que el usuario administrador este conectado */
ProductRouter.post("/addProduct", [validateName, validateDescription, validatePrice, validateBrand, validateCategoria, validarErrores], ProductController.addProduct);

/**Tener en cuenta que si el id no se encuentra que avise al usuario */
ProductRouter.put("/editProduct/:id", [idRequired, validateName, validateDescription, validarErrores], ProductController.editProduct);

ProductRouter.get("/getProductById/:id", [idRequired, validarErrores], ProductController.getProductById);


module.exports = ProductRouter;
