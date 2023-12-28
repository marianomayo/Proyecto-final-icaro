const OrdenCompraModel = require('../Model/OrdenCompraModel');
const OrdenCompraArticuloModel = require('../Model/OrdenCompraArticuloController');
const ViewOrdenCompraXArticuloModel = require('../Model/ViewOrdenCompraPorArticulo');
const productModel = require('../Model/ProductModel');


const addToCart = async (req, res) => {
    try {

        const vObjProducto = req.body;
        const current_user =  req.session.userId;
         
    
        const existOrder = await OrdenCompraModel.getOrderUserInProcess(current_user);        
        
        let edicion = false;
        let result = null;
       
        if(existOrder.length > 0){
           
            const existOrdenProducto = await OrdenCompraArticuloModel.productoInOrder(existOrder[0].idorden_compra, vObjProducto.id_producto);
          
            if(existOrdenProducto.length > 0) {
                result = await OrdenCompraArticuloModel.editCart(existOrder[0].idorden_compra, vObjProducto );   
                edicion = true;
            }else{
                result = await OrdenCompraArticuloModel.addToCart(existOrder[0].idorden_compra, vObjProducto)
            }
        }else{
            
            const idOrder = await OrdenCompraModel.initOrder(current_user);
            
            result = await OrdenCompraArticuloModel.addToCart(idOrder, vObjProducto)
            
        }
        
        if(result) {
            await productModel.editCantidad(vObjProducto.ncantidad)
            let message = edicion ? 'Se ha editado las cantidades en el carrito.' : 'Producto Agregado al carrito.';
            res.status(200).json({ msg: message, success: true });
        }else{
            res.status(500).json({ msg: 'Hubo un problema al generar la orden del producto', success: true });
        }
      
        
    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: 'Error interno del servidor.', success: false });
    }
}


const deleteProductCart = async (req, res) => {
    try {
        const idOrdenCompraProducto = req.body.idorden_compra_x_producto;
      
        const result = await OrdenCompraArticuloModel.deleteProductOrder(idOrdenCompraProducto);
        if(result){
            
            res.status(200).json({ msg: 'Producto eliminado del carrito', success: true });
        }  else{
            res.status(404).json({ msg: 'Hubo un problema al borrar el producto del carrito', success: false });
        }

    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: 'Error interno del servidor.', success: false });
    }
  
}

const getUserOrderInProcess = async(req, res) => {

    try {
        const current_user = req.session.userId;
    
        const ordenResult = await OrdenCompraModel.getOrderUserInProcess(current_user);
        if(ordenResult.length > 0){
            
            const result = await ViewOrdenCompraXArticuloModel.getProductInOrderByUserActive(ordenResult[0].idorden_compra, current_user);

            if(result.length > 0) {
                res.status(200).json({
                    msg: `Se han recuperado ${result.length} articulos en carrito`,
                    data: result,
                    success: true
                })
            }else{
                res.status(404).json({ msg: 'Hubo un problema en el servidor.', success: false });
            }
        }else{
            res.status(200).json({
                msg: `No hay ninguna orden activa por el usuario ${req.session.nombre}`,
                data: ordenResult,
                success: true
            })
        }

        
    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: 'Error interno del servidor.', success: false });
    }
}


module.exports = { addToCart, deleteProductCart, getUserOrderInProcess };