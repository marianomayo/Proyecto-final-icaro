const CategoriaModel = require('../Model/CategoriasModel');


const getCategorias = async (req, res) => {

    try {

        const categorias = await CategoriaModel.getCategorias();

        if(categorias){
            res.status(200).send({msg: `Se encontraron ${categorias.length} categorias`, data: categorias, success: true});
        }else{
            res.status(404).send({msg: `Hubo un problema al obtener categorias`, success: false});

        }
        

    } catch (error) {
        console.log(error);
        res.status(404).send({msg: `Error en el servidor`, success: false});
    }
}

module.exports = { getCategorias }