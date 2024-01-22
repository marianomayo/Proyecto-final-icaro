const ProductModel = require('../Model/ProductModel');
const ViewProductModel = require('../Model/ViewProductModel');
const BrandModel = require('../Model/BrandModel');
const CategoriaModel = require('../Model/CategoriasModel');
const ViewComentarios = require('../Model/ViewComentarios');
const ComentariosModel = require('../Model/ComentariosModel');

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
                'message' : "hubo un error al crear el producto"
            })
        }
    }catch(error){
        console.log(error)
        res.status(404).send({'message' : "Error al crear el producto", 'success': false  })
    }
    

    
    
}

const editProduct = async (req, res) => {
    
    try {
        const idParams = Number(req.params.id);
        if(req.body.boferta === 0 || req.body.tsofertahasta == null){
            req.body.tsofertahasta = '2024-12-31 12:00:00';
        }
        if(req.body.tsofertahasta == null){
            req.body.tsofertahasta = '2024-12-31 12:00:00';
        }
        if(req.body.tsofertahasta.includes('T')){
            req.body.tsofertahasta = req.body.tsofertahasta.replace('T', ' ').replace('.000Z', '');           
        }
        
        const response = await ProductModel.editProduct(idParams, req.body);

        if(response){
            res.status(200).send({ 
                "message": `El producto ${req.body.vnombre} fue actualizado correctamente`,
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

const getProductById = async (req, res) => {
    try{
        const idParams = Number(req.params.id);
        const response = await ViewProductModel.getProductById(idParams);
        const responseComentarios = await ViewComentarios.getComentariosProducto(idParams);
        if(response.length > 0){
            res.status(200).send({ 
                "data": response,
                "comentarios": responseComentarios,
                "success": true
            });
        }else{
            res.status(404).send({
                'msg' : `El product ${idParams} al cual intentas acceder, no existe en la Base de Datos.`
            })
        }
    }catch(error){
        console.log(error)
        res.status(404).send({'msg' : "Error al obtener el producto", 'success': false  })
    }
    
  
}


const getPrecioMinimoYMaximo = async (req, res) => {
    try {
        const response = await ViewProductModel.getPrecioMinimoYMaximo();

        if(response){
            res.status(200).send({ 
                "data": response,
                "success": true
            });
        }else{
            res.status(404).send({
                'msg' : "hubo un error al obtener el precio minimo y maximo"
            })
        }
    }catch(error){
        console.log(error)
        res.status(404).send({'msg' : "Error al obtener precio minimo y maximo", 'success': false  })
    }
}

const getComentariosById = async (req, res) => {
    try{
        const idParams = Number(req.params.id);
        const response = await ViewComentarios.getComentariosProducto(idParams);
        
        if(response.length > 0){
            res.status(200).send({ 
                "data": response,
                "msg" : `Hay un total de ${response.length} comentarios`,
                "success": true
            });
        }else{
            res.status(200).send({ 
                "data": response,
                "msg" : `No hay comentarios`,
                "success": true
            });
        }
    }catch(error){
        console.log(error)
        res.status(404).send({'msg' : "Error al obtener comentarios", 'success': false  })
    }
}


const addComentario = async (req, res) => {
    try{
        const current_user = req.session.userId;
        const vObj = req.body;
        
        const response = await ComentariosModel.addComentario(vObj, current_user);
        const comentarios = await ViewComentarios.getComentariosProducto(vObj.id_producto);

        if(comentarios.length > 0){
            res.status(200).send({ 
                "data": comentarios,
                "msg" : `Comentario agregado`,
                "success": true
            });
        }else{
            res.status(400).send({ 
                "data": response,
                "msg" : `Surgio un error`,
                "success": true
            });
        }
    }catch(error){
        console.log(error)
        res.status(404).send({'msg' : "Error al agregar comentarios", 'success': false  })
    }
}

module.exports = {getAll, addProduct, editProduct, getProductById, getPrecioMinimoYMaximo, getComentariosById, addComentario};