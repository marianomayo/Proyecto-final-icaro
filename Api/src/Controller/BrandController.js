const BrandModel = require('../Model/BrandModel');

const getAll = async (req, res) => {    
    try {
        const brand = await BrandModel.getAll();
        if(brand){
            res.status(200).send({msg: `Se encontraron ${brand.length} marcas`, data: brand, success: false});
        }else{
            res.status(404).send({msg: `Hubo un problema al obtener Marcas`, success: false});
        }
    } catch (error) {
        console.log(error);
        res.status(404).send({msg: `Error en el servidor`, success: false});

    }
   
}

module.exports = { getAll }