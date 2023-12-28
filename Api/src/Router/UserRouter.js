const { Router } = require('express');

const UserController = require('../Controller/UserController');
const UserRouter = Router();

const { validarErrores } = require("../Middlewares");
const { validateName, validateApellido, validateDireccion, validateNumero, validateEmail, validatePassword } = require('../Middlewares/UserMiddleware');

UserRouter.post("/signUp", [validateName, validateApellido, validateDireccion, validateNumero, validateEmail, validatePassword, validarErrores], UserController.addUser);

UserRouter.post("/logIn", [validateEmail, validatePassword, validarErrores], UserController.logIn);


module.exports = UserRouter;

