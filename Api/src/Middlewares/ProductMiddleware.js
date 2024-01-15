const { body, param } = require("express-validator");
const { getBrandById } = require('../Model/BrandModel');
const { getCategoriaById } = require('../Model/CategoriasModel');

const validateName = body("vnombre") 
  .notEmpty()
  .withMessage("El nombre es obligatorio")
  .isString()
  .withMessage("El nombre del producto debe ser un string")
  .isLength({
    min: 1, 
    max: 150
  })
  .withMessage("El nombre no debe ser mayor a 150 caracteres");

  const validateDescription = body("tdescripcion") 
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
  .isFloat({ min: 1 })
  .withMessage("El precio debe ser mayor o igual a 1");


const validateBrand = body("id_marca") 
.notEmpty()
.withMessage("La marca es obligatoria");

const validateCategoria = body("idcategoria") 
.notEmpty()
.withMessage("La Categoria es obligatoria");

const existCategoria = async (req, res, next) => {

    const {idcategoria} = req.body;
    if(idcategoria !== undefined){
      const categoria = await getCategoriaById(idcategoria);
      if(categoria.length > 0){
        next();
      }else{
        res.status(400).json({ message: 'No existe la categoria', success: false });
      }
    }else{
      res.status(400).json({ message: 'Ingrese categoria', success: false });
    }
   
  
};

const existMarca = async (req, res, next) => {

  const {id_marca} = req.body;
  if(id_marca !== undefined){
    const marca = await getBrandById(id_marca);
    if(marca.length > 0){
      next();
    }else{
      res.status(400).json({ message: 'No existe la Marca', success: false });
    }
  }else{
    res.status(400).json({ message: 'Ingrese Marca', success: false });
  }
  
};



module.exports = {validateName, validateDescription, validatePrice, validateBrand, validateCategoria, existCategoria, existMarca};