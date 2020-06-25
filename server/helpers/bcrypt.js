const bcrypt = require('bcrypt');

module.exports = {
    hashPassword: function (password) {  
        const saltRounds = 8;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
        return hash
    },
    checkPassword: function (password, hashed) {  
        return bcrypt.compareSync(password, hashed); 
    }
}