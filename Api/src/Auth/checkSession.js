
const checkSession = (req, res, next) => {

    if (req.session && req.session.userId) { 
        next();
    } else {
        res.status(401).json({ message: 'No autorizado, por favor, debe loguearse' });
    }
};

module.exports = {checkSession};