const { body, param } = require("express-validator");


const validateName = body("nombre") 
  .notEmpty()
  .withMessage("El nombre es obligatorio")
  .isString()
  .withMessage("El nombre debe ser un texto")
  .isLength({
    min: 1, 
    max: 150
  })
  .withMessage("El nombre no debe ser mayor a 150 caracteres");

  
const validateApellido = body("apellido") 
.notEmpty()
.withMessage("El Apellido es obligatorio")
.isString()
.withMessage("El Apellido debe ser un texto")
.isLength({
  min: 1, 
  max: 150
})
.withMessage("El apellido no debe ser mayor a 150 caracteres");

  
const validateDireccion = body("direccion") 
.notEmpty()
.withMessage("La direccion es obligatoria")
.isLength({
  min: 1, 
  max: 100
})
.withMessage("La direccion no debe ser mayor a 100 caracteres");

const validateNumero = body("numero") 
.notEmpty()
.withMessage("El numero es obligatorio")
.isNumeric()
.withMessage("Debe ser un valor numérico")
.isLength({
  min: 1, 
  max: 50
})
.withMessage("El numero no debe ser mayor a 50 caracteres");

const validateEmail = body("email")
.notEmpty()
.withMessage("El email es obligatorio")  
.isLength({ max: 150 })
.withMessage("El email no debe ser mayor a 150 caracteres");

const validatePassword = body("password")
.notEmpty()
.withMessage("La contraseña es obligatoria")
.isLength({ max: 100 })
.withMessage("La contraseña no debe ser mayor a 100 caracteres");


  
module.exports = {validateName, validateApellido, validateDireccion, validateNumero, validateEmail, validatePassword};