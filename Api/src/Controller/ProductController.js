const ProductModel = require('../Model/ProductModel');
const ViewProductModel = require('../Model/ViewProductModel');
const BrandModel = require('../Model/BrandModel');
const CategoriaModel = require('../Model/CategoriasModel');

const getAll = async (req, res) => {    

    try {
        const product = await ViewProductModel.getAll();
        if(product){
            res.status(200).send({ data: product, success: true });
        }else{
            res.status(404).send({ msg: 'No se ha encontrado productos', success: false });
        }
    } catch (error) {
        console.log(error)
        res.status(404).send({'msg' : "Error al obtener los productos", 'success': false  })
    }
   
   
}

const addProduct = async (req, res) => {
    const nMarca = req.body.nmarca;
    const nCategoria =  req.body.idcategoria;

    const brand = await BrandModel.getBrandById(nMarca);

    const categoria = await CategoriaModel.getCategoriaById(nCategoria);

    if(categoria.length > 0 && brand.length){
        
    }

    BrandModel.getBrandById(nMarca).then((pResultadoMarca) => {
        if (pResultadoMarca.length === 0) {            
            res.status(404).send({
                "message": `La marca seleccionada no existe en la Base de Datos` 
            })
        } else {
            ProductModel.addProduct(req.body).then((pResultadoProducto) => {
                res.status(200).send({ 
                    "message": `El producto fue agregado correctamente` 
                });
            }).catch((e) => res.status(404).send({
                    'msg' : "hubo un error al crear el producto"
                }))
        }
    })
    
    
}

const editProduct = (req, res) => {
    
    const idParams = Number(req.params.id);
    ProductModel.editProduct(idParams, req.body).then((pResultadoProducto) => {
        res.status(200).send({ 
            "message": `El producto ${req.body.nombre} fue actualizado correctamente` 
        });
    }).catch((e) => res.status(404).send({
        'msg' : "hubo un error al actualizar el producto producto",
        'error': e
    }))
    
}

const getProductById = (req, res) => {

    const idParams = Number(req.params.id);
    
    ViewProductModel.getProductById(idParams).then((product) => {
        res.status(200).send({ product });
    }).catch((e) => res.status(404).send({
        'msg' : `Error al obtener producto ${idParams}`
    }));
}

module.exports = {getAll, addProduct, editProduct, getProductById};