const path = require('path');

const home = (req, res) => {    
    res.sendFile(path.join(__dirname, '..', 'View', 'index.html'))
}

const signup = (req, res) => {    
    res.sendFile(path.join(__dirname, '..', 'View', 'signup.html'))
}

const login = (req, res) => {    
    res.sendFile(path.join(__dirname, '..', 'View', 'login.html'))
}

const cart = (req, res) => {    
    res.sendFile(path.join(__dirname, '..', 'View', 'cart.html'))
}

const productDetail = (req, res) => {    
    res.sendFile(path.join(__dirname, '..', 'View', 'productDetail.html'))
}


module.exports = { home, signup, login, cart, productDetail }