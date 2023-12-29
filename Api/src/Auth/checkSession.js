
const checkSession = (req, res, next) => {

    if (req.session && req.session.userId) { 
        next();
    } else {
        res.status(401).json({ message: 'No autorizado, por favor, debe loguearse' });
    }
};

const checkSessionAdmin = (req, res, next) => {

    if (req.session && req.session.userId && req.session.administrador) { 
        next();
    } else {
        res.status(401).json({ message: 'No autorizado, por favor, debe loguearse como administrador' });
    }
};

module.exports = {checkSession, checkSessionAdmin};