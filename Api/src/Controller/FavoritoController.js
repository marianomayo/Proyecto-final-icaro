const OrdenCompraModel = require('../Model/OrdenCompraModel');
const OrdenCompraArticuloModel = require('../Model/OrdenCompraArticuloController');
const ViewOrdenCompraXArticuloModel = require('../Model/ViewOrdenCompraPorArticulo');
const FavoritoModel = require('../Model/FavoritoModel');


const addToFav = async (req, res) => {
    try {

        const vObjProducto = req.body;
        const current_user =  req.session.userId;
        
        const existFavArticle = await FavoritoModel.getFavByUserAndProduct(current_user, vObjProducto.id_producto);        
        console.log(existFavArticle);
        
        if(existFavArticle.length > 0){
            const vObjFav = await FavoritoModel.getAllByUser(current_user);            
            return res.status(200).json({ msg: 'El producto ya ha sido agregado a Favorito', success: true, cantidad: vObjFav.length, producto: vObjFav  });
        }else{
            const result = await FavoritoModel.addToFav(vObjProducto.id_producto, current_user);
            const vObjFav = await FavoritoModel.getAllByUser(current_user); 
            
            return res.status(200).json({ msg: 'El producto ha sido agregado a tus Favorito', success: true, cantidad: vObjFav.length, producto: vObjFav  });
        }
        
    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: 'Error interno del servidor.', success: false });
    }
}


const deleteProductFav = async (req, res) => {
    try {
        const current_user =  req.session.userId;
        const vObjData = req.body;
       
        const result = await FavoritoModel.deleteFav(vObjData.id_producto, current_user);
        const vObjFav = await FavoritoModel.getAllByUser(current_user);     
      
        if(result){
            
            res.status(200).json({ msg: 'Producto eliminado de favorito', success: true, cantidad: vObjFav.length, producto: vObjFav });
        }  else{
            res.status(404).json({ msg: 'Hubo un problema al borrar el producto de favoritos', success: false });
        }

    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: 'Error interno del servidor.', success: false });
    }
  
}

const getFavByUser = async(req, res) => {

    try {
        const current_user = req.session.userId;
    
        const vObjFav = await FavoritoModel.getAllByUser(current_user); 

        
        res.status(200).json({ msg: `Se ha encontrado un total de ${vObjFav.length} favoritos`, success: true, cantidad: vObjFav.length, producto: vObjFav});
        

        
    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: 'Error interno del servidor.', success: false });
    }
}


module.exports = { addToFav, deleteProductFav, getFavByUser };