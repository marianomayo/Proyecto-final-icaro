const OrdenCompraModel = require('../Model/OrdenCompraModel');
const OrdenCompraArticuloModel = require('../Model/OrdenCompraArticuloController');
const ViewOrdenCompraXArticuloModel = require('../Model/ViewOrdenCompraPorArticulo');
const ViewProductModel = require('../Model/ViewProductModel');


const addToCart = async (req, res) => {
    try {

        const vObjProducto = req.body;
        const current_user =  req.session.userId;
         
        const existOrder = await OrdenCompraModel.getOrderUserInProcess(current_user);        
        const getProduct = await ViewProductModel.getProductById(vObjProducto.id_producto);
        const cantidadProducto = getProduct[0].ncantidad;

        let result = null;
        let objResultado = null
        if(existOrder.length > 0){
                                           
            const existOrdenProducto = await OrdenCompraArticuloModel.productoInOrder(existOrder[0].idorden_compra, vObjProducto.id_producto);
            if(existOrdenProducto.length > 0) {
                const cantidad = existOrdenProducto[0].ncantidad
               
                if((cantidad + 1) > cantidadProducto ){
                    return res.status(400).json({ msg: 'No hay cantidad suficiente para agregar al carrito', success: false });
                }
                result = await OrdenCompraArticuloModel.editCart(existOrder[0].idorden_compra, vObjProducto );  
               
            }else{
                result = await OrdenCompraArticuloModel.addToCart(existOrder[0].idorden_compra, vObjProducto)
            }
            objResultado = await ViewOrdenCompraXArticuloModel.getProductInOrderByUserActive(existOrder[0].idorden_compra, current_user);
        }else{

            if( cantidadProducto < 1 ){
                return res.status(400).json({ msg: 'No hay cantidad suficiente para agregar al carrito', success: false });
            }
            
            const idOrder = await OrdenCompraModel.initOrder(current_user);
            
            result = await OrdenCompraArticuloModel.addToCart(idOrder, vObjProducto)
            
            objResultado = await ViewOrdenCompraXArticuloModel.getProductInOrderByUserActive(idOrder, current_user);
        }

        const totalCantidad = objResultado.reduce((total, producto) => total + producto.ncantidad, 0);
        const precioTotal = objResultado.reduce((total, producto) => total + producto.ftotalprecio, 0);
        if(result) {                        
            res.status(200).json({ msg: 'Producto Agregado al carrito.', success: true, cantidad: totalCantidad, productos: objResultado, precioTotal: precioTotal });
        }else{
            res.status(400).json({ msg: 'Hubo un problema al agregar el producto al carrito', success: false });
        }
      
        
    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: 'Error interno del servidor.', success: false });
    }
}


const deleteProductCart = async (req, res) => {
    try {
        const current_user =  req.session.userId;
        const vObjData = req.body;
       
        const result = await OrdenCompraArticuloModel.deleteProductOrder(vObjData.idOrdenCompraxproducto);
        const objResultado = await ViewOrdenCompraXArticuloModel.getProductInOrderByUserActive(vObjData.idOrden, current_user);

        const totalCantidad = objResultado.reduce((total, producto) => total + producto.ncantidad, 0);
        const precioTotal = objResultado.reduce((total, producto) => total + producto.ftotalprecio, 0);
        if(result){
            
            res.status(200).json({ msg: 'Producto eliminado del carrito', success: true, cantidad: totalCantidad, productos: objResultado, precioTotal: precioTotal  });
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
                const totalCantidad = result.reduce((total, producto) => total + producto.ncantidad, 0);
                const precioTotal = result.reduce((total, producto) => total + producto.ftotalprecio, 0);
                res.status(200).json({
                    msg: `Se han recuperado ${result.length} articulos en carrito`,
                    productos: result,
                    cantidad: totalCantidad,
                    precioTotal: precioTotal,
                    success: true
                })
            }else{
                res.status(404).json({ msg: 'Hubo un problema en el servidor.', success: false });
            }
        }else{
            res.status(200).json({
                msg: `No hay ninguna orden activa por el usuario ${req.session.nombre}`,
                productos: ordenResult,
                cantidad: 0,
                success: true
            })
        }

        
    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: 'Error interno del servidor.', success: false });
    }
}


module.exports = { addToCart, deleteProductCart, getUserOrderInProcess };