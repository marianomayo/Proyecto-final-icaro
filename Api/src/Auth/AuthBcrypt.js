const bcrypt = require('bcrypt');

const SALT = 10;

const transformateHash  = (string) => {
    return bcrypt.hashSync(string, SALT);
}

const compareHash = (password, passwordHash) => {
    return bcrypt.compareSync(password, passwordHash);
}


module.exports = {transformateHash, compareHash};