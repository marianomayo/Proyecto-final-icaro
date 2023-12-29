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
    try{
        const current_admin =  req.session.userId;
        const response = ProductModel.addProduct(req.body, current_admin);
        if(response){
            res.status(200).send({ 
                "message": `El producto fue agregado correctamente`,
                "success": true
            });
        }else{
            res.status(404).send({
                'msg' : "hubo un error al crear el producto"
            })
        }
    }catch(error){
        console.log(error)
        res.status(404).send({'msg' : "Error al crear el producto", 'success': false  })
    }
    

    
    
}

const editProduct = async (req, res) => {
    
    try {
        const idParams = Number(req.params.id);

        const response = await ProductModel.editProduct(idParams, req.body);
        if(response){
            res.status(200).send({ 
                "message": `El producto ${req.body.nombre} fue actualizado correctamente`,
                'success': true
            });
        }else{
            res.status(404).send({
                'msg' : "hubo un error al actualizar el producto producto",
                'error': e,
                'success': false
            })
            
        }
    }catch(error){
        console.log(error)
        res.status(404).send({'msg' : "Error al Editar producto", 'success': false  })
    }
    
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