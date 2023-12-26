const AuthBcrypt = require('../Auth/AuthBcrypt');
const UserModel = require('../Model/UserModel');

const addUser = async (req, res) => {
    try {
        const user = req.body;

        const existingUser = await UserModel.getUser(user.email);

        if (existingUser.length > 0) {          
            return res.status(400).json({ msg: 'El usuario ya existe.', success: false });
        }
       
        user.password = AuthBcrypt.transformateHash(user.password);
        const result = await UserModel.addUser(user);
        
        if (result) {
            //buscamos la informacion del usuario agregado y lo guardamos en la session
            const getUser = await UserModel.getUser(user.email); 
            if(getUser.length > 0){
                console.log(getUser[0].id_usuario)
                req.session.userId = getUser[0].id_usuario;
                req.session.nombre = getUser[0].vnombre;
                req.session.apellido = getUser[0].vapellido;
            }else{
                return res.status(500).json({ msg: 'Hubo un problema al guardar los datos.',  success: false });
            }
           
            res.status(200).json({ msg: 'Usuario agregado exitosamente.', success: true });
        } else {          
            res.status(500).json({ msg: 'Error al agregar el usuario.',  success: false });
        }
    } catch (error) {      
        console.error(error);
        res.status(500).json({ msg: 'Error interno del servidor.', success: false });
    }
   
    
}


const logIn = async (req, res) => {
    try {
        const { email, password } = req.body;
       
        const existingUser = await UserModel.getUser(email);

        if (existingUser.length === 0) {
            return res.status(401).json({ msg: 'El usuario no existe.', success: false });
        }else{       

            if (!AuthBcrypt.compareHash(password, existingUser[0].vpassword)) {
                return res.status(401).json({ msg: 'La contraseña es incorrecta.', success: false });
            }
            
            req.session.userId = existingUser[0].id_usuario;
            req.session.nombre = existingUser[0].vnombre;
            req.session.apellido = existingUser[0].vapellido;
            console.log(req.session)
            res.status(200).json({ msg: 'Inicio de sesión exitoso.', success: true });
        }
       
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error interno del servidor.', success: false });
    }
};


module.exports = { addUser, logIn };