const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const serve = require('koa-static');
const router = require('./routes/router');
const cors = require('@koa/cors');
const app = new Koa();
const PORT = process.env.PORT || 9006;


require("./models")(app)
app.use(cors());
app.use(logger());

// body-parser
app.use(bodyParser());

app.use(serve('./uploads/'));

// Custom 401 handling
app.use(async (ctx, next) => {
    return next().catch((err) => {
        if (err.status === 401) {
            ctx.status = 401;
            let errMessage = err.originalError ?
                err.originalError.message :
                err.message
            ctx.body = {
                error: errMessage
            };
            ctx.set("X-Status-Reason", errMessage)
        } else {
            throw err;
        }
    });
});

// routes
app.use(router.routes(), router.allowedMethods());

// server
const server = app.listen(PORT, () => {    
    console.log(`Server listening on port: ${PORT}`);  
    //logger((ctx) => ({info: 'hi'}));
});

module.exports = server;