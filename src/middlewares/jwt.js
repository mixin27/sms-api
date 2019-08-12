const jwt = require('koa-jwt');

const secret = process.env.JWT_SECRET || 'jwt_secret';

module.exports = jwt({
    secret: secret
});