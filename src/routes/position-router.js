const Router = require('koa-router');
const positionQueries = require('../services/position');
const messageConfig = require('../config/msgConfig');

const router = new Router();
const BASE = '/positions';

router.get(BASE, async(ctx) => {
    try{
        
        const positions = await positionQueries.getAllPostion();

        ctx.body = {
            status: messageConfig.status.success,
            data: positions
        };
    } catch(err) {
        ctx.status = 400;
        ctx.body = {
            status: messageConfig.status.error,
            message: err.message || messageConfig.message.error.internalError
        };
    }
});

router.get(`${BASE}/:id`, async (ctx) => {
    try {        
        const position = await positionQueries.getpositionById(ctx.params.id);        
        ctx.body = {
            status: messageConfig.status.success,
            data: position
        };
    } catch(err) {
        ctx.status = 400;
        ctx.body = {
            status: messageConfig.status.error,
            message: err.message || messageConfig.message.error.internalError
        };
    }
});

router.post(`${BASE}`,async (ctx) => {
    try {        
        const position = await positionQueries.addPosition(ctx.request.body);    
        console.log(ctx.request.body)
        if(position && position != 'error') {
            ctx.status = 201;
            ctx.body = {
                status: messageConfig.status.success,
                data: position
            };
        } else {            
            ctx.status = 404;
            ctx.body = {
                status: messageConfig.status.error,
                message: messageConfig.message.error.internalError
            };
        }
    } catch(err) {        
        ctx.status = 400;
        ctx.body = {
            status: messageConfig.status.error,
            message: err.message || messageConfig.message.error.internalError
        };
    }
});

router.put(`${BASE}/:id`, async (ctx) => {
    try {        
        const position = await positionQueries.updatePosition(ctx.params.id, ctx.request.body);                
        if(position && position != 'error') {
            ctx.status = 200;
            ctx.body = {
                status: 'success',
                data: position
            };            
        } else {            
            ctx.status = 404;
            ctx.body = {
                status: messageConfig.status.error,
                message: messageConfig.message.error.internalError
            };
        }
    } catch (err) {
        // console.log('Router Exception Error .... : ' + err);        
        ctx.status = 400;
        ctx.body = {
            status: messageConfig.status.error,
            message: err.message || messageConfig.message.error.internalError
        };
    }
});

router.delete(`${BASE}/:id`, async (ctx) => {
   
    try {        
        const position = await positionQueries.deletePosition(ctx.params.id); 
        console.log(position)
        if(position && position != 'error') {
            ctx.status = 200;
            ctx.body = {
                status: 'success',
                data: position
            };            
        } else {            
            ctx.status = 404;
            ctx.body = {
                status: messageConfig.status.error,
                message: messageConfig.message.error.fileNotFound
            };
        }
    } catch (err) {
        // console.log('Router Exception Error .... : ' + err);        
        ctx.status = 400;
        ctx.body = {
            status: messageConfig.status.error,
            message: err.message || messageConfig.message.error.internalError
        };
    }
});

module.exports = router;