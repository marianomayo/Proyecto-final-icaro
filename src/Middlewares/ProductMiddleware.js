const { body, param } = require("express-validator");
const { getBrandById } = require('../Model/BrandModel');

const validateName = body("nombre") 
  .notEmpty()
  .withMessage("El nombre es obligatorio")
  .isString()
  .withMessage("El nombre del producto debe ser un string")
  .isLength({
    min: 1, 
    max: 150
  })
  .withMessage("El nombre no debe ser mayor a 150 caracteres");

  const validateDescription = body("descripcion") 
  .notEmpty()
  .withMessage("La descripcion es obligatoria")
  .isString()
  .withMessage("El descripcion del producto debe ser un string")
  .isLength({
    min: 1, 
    max: 500
  })
  .withMessage("La descripcion no debe ser mayor a 500 caracteres");;

  
  const validatePrice = body("fprecio") 
  .notEmpty()
  .withMessage("El precio es obligatorio")
  .isNumeric()
  .withMessage("El precio debe ser un numero")
  .isFloat({ min: 0 })
  .withMessage("El precio debe ser mayor que 0");


  /**
   * Todo
   * Realizar chequeo de existencia de marca a nivel de middleware
   */
  const validateBrand = body("nmarca") 
  .notEmpty()
  .withMessage("La marca es obligatoria");

  const validateCategoria = body("ncategoria") 
  .notEmpty()
  .withMessage("La Categoria es obligatoria");



  module.exports = {validateName, validateDescription, validatePrice, validateBrand, validateCategoria};