const Router = require('koa-router');
const jwt = require('../middlewares/jwt');
const router = new Router();

router.get('/', jwt, async(ctx) => {
    ctx.body = {
        status: 'success',
        message: 'hello, world!'
    };
});

module.exports = router;