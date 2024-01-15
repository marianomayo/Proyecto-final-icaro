const AuthBcrypt = require('../Auth/AuthBcrypt');
const UserModel = require('../Model/UserModel');
const AdministradorModel = require('../Model/AdministradorModel');

const addUser = async (req, res) => {
    try {
        const user = req.body;
        
        const existingUser = await UserModel.getUser(user.email);
       
        if (existingUser.length > 0) {          
            return res.status(400).json({ msg: `El usuario con el email ${user.email}  ya existe.`, success: false });
        }

        const existingUserAdmin = await AdministradorModel.getAdmin(user.email);

        if (existingUserAdmin.length > 0) {          
            return res.status(400).json({ msg: 'El usuario con el email ingresado ya existe registrado.', success: false });
        }
       
        user.password = AuthBcrypt.transformateHash(user.password);
        if(user.depto == undefined || user.depto == ''){
            user.depto = '';
        }
        const result = await UserModel.addUser(user);
        
        if (result) {
            //buscamos la informacion del usuario agregado y lo guardamos en la session
            const getUser = await UserModel.getUser(user.email); 
            if(getUser.length > 0){                
                req.session.userId = getUser[0].id_usuario;
                req.session.nombre = getUser[0].vnombre;
                req.session.apellido = getUser[0].vapellido;
                req.session.administrador = false;
                req.session.vfullname = getUser[0].vnombre + ', ' + getUser[0].vapellido;
            }else{
                return res.status(500).json({ msg: 'Hubo un problema al guardar los datos.',  success: false });
            }
           
            res.status(200).json({ msg: 'Usuario agregado exitosamente.', success: true, sessionData: {
                userId: req.session.userId,
                nombre: req.session.nombre,
                apellido: req.session.apellido,
                administrador: req.session.administrador,
                vfullname: req.session.vfullname
              }  });
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

        if (existingUser.length > 0) {           

            if (!AuthBcrypt.compareHash(password, existingUser[0].vpassword)) {
                return res.status(401).json({ msg: 'La contraseña es incorrecta.', success: false });
            }
            
            req.session.userId = existingUser[0].id_usuario;
            req.session.nombre = existingUser[0].vnombre;
            req.session.apellido = existingUser[0].vapellido;
            req.session.administrador = false;
            req.session.vfullname = existingUser[0].vnombre + ',' + existingUser[0].vapellido;
            res.status(200).json({ msg: 'Inicio de sesión exitoso.', success: true, sessionData: {
                userId: req.session.userId,
                nombre: req.session.nombre,
                apellido: req.session.apellido,
                administrador: req.session.administrador,
                vfullname: req.session.vfullname
              } });
        }else{
            //verificamos si no es un administrador
            const existingAdmin = await AdministradorModel.getAdmin(email);

            if(existingAdmin.length > 0){
                
                if (!AuthBcrypt.compareHash(password, existingAdmin[0].vpassword)) {
                    return res.status(401).json({ msg: 'La contraseña es incorrecta.', success: false });
                }

                req.session.userId = existingAdmin[0].id_administrador;
                req.session.nombre = existingAdmin[0].vnombre;
                req.session.apellido = existingAdmin[0].vapellido;
                req.session.administrador = true;
                req.session.vfullname = existingAdmin[0].vnombre + ',' + existingAdmin[0].vapellido;

                res.status(200).json({ msg: 'Inicio de sesión exitoso para administrador.', success: true, sessionData: {
                    userId: req.session.userId,
                    nombre: req.session.nombre,
                    apellido: req.session.apellido,
                    administrador: req.session.administrador,
                    vfullname: req.session.vfullname
                  } });
            } else {               
                return res.status(401).json({ msg: 'El usuario no existe.', success: false });
            }

        }
       
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error interno del servidor.', success: false });
    }
};


module.exports = { addUser, logIn };