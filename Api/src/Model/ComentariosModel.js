const db = require("../db");


const addComentario = async (vObj, current_user) => {
    return db.query(
        `INSERT INTO comentarioxproducto (id_producto, id_usuario, tcomentario, nrate) 
            VALUES (${vObj.id_producto},  ${current_user}, '${vObj.tcomentario}',  ${vObj.nrate})`
      );
   
};


module.exports = { addComentario };