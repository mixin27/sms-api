const bcrypt = require('bcryptjs');

const queries = require('../services/users');

function ensureAuthenticated(ctx) {
    return ctx.isAuthenticated();
}

function ensureAdmin(ctx) {
    return new Promise((resolve, reject) => {
        if (ctx.isAuthenticated()) {
            queries.getUserById(ctx.state.user.id)
            .then((user) => {
                // ** This script need to be changed and lined to role 
                if (user && user[0].user_name === 'default-admin') resolve(true);
                resolve(false);
            })
            .catch((err) => { reject(false); });
        }
        return false;
    });
}

function comparePass(userPassword, databasePassword) {
    return bcrypt.compareSync(userPassword, databasePassword);
}

module.exports = {
    ensureAuthenticated,
    ensureAdmin,
    comparePass
};