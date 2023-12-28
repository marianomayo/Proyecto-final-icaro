const { body, param } = require("express-validator");

const idRequired = param("id")
  .isInt({ min: 0 })
  .withMessage("El parámetro debe ser un número mayor a 0");


  module.exports = {idRequired};