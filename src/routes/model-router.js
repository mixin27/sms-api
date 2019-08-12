const Router = require('koa-router');
//const userQueries = require('../services/users');
const modelsQueries = require('../services/model');
const messageConfig = require('../config/msgConfig');
//const jwt = require('../middlewares/jwt');

const router = new Router();
const BASE = '/models';

router.get(BASE, async(ctx) => {
    try{
        //console.log('I am here....');
        const model = await modelsQueries.getAllModel();
        //console.log('Testing:' . JSON.stringify(users));

        ctx.body = {
            status: messageConfig.status.success,
            data: model
        };
    } catch(err) {
        ctx.status = 400;
        ctx.body = {
            status: messageConfig.status.error,
            message: err.message || messageConfig.message.error.internalError
        };
    }
});

router.get(`${BASE}/:id`,  async (ctx) => {
    try {        
        const model = await modelsQueries.getModelById(ctx.params.id);        

            ctx.body = {
                status: messageConfig.status.success,
                data: model
            };
        
    } catch(err) {
        ctx.status = 400;
        ctx.body = {
            status: messageConfig.status.error,
            message: err.message || messageConfig.message.error.internalError
        };
    }
});

router.post(`${BASE}`,  async (ctx) => {
    try {        
        const model = await modelsQueries.addModel(ctx.request.body);
        console.log(ctx.request.body)    
           
        if(model && model != 'error') {
            ctx.status = 201;
            ctx.body = {
                status: messageConfig.status.success,
                data: model
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

router.put(`${BASE}/:id`,  async (ctx) => {
    try {        
        const model = await modelsQueries.updateModel(ctx.params.id, ctx.request.body);                
        if(model && model != 'error') {
            ctx.status = 200;
            ctx.body = {
                status: 'success',
                data: model
            };            
        } else {            
            ctx.status = 404;
            ctx.body = {
                status: messageConfig.status.error,
                message: messageConfig.message.error.internalError
            };
        }
    } catch (err) {
              
        ctx.status = 400;
        ctx.body = {
            status: messageConfig.status.error,
            message: err.message || messageConfig.message.error.internalError
        };
    }
});

router.delete(`${BASE}/:id`,  async (ctx) => {
    try {        
        const model = await modelsQueries.deleteModel(ctx.params.id); 
        console.log(model)
        
        if(model && model != 'error') {
            ctx.status = 200;
            ctx.body = {
                status: 'success',
                data: model
            };            
        } else {            
            ctx.status = 404;
            ctx.body = {
                status: messageConfig.status.error,
                message: messageConfig.message.error.fileNotFound
            };
        }
    } catch (err) {
          
        ctx.status = 400;
        ctx.body = {
            status: messageConfig.status.error,
            message: err.message || messageConfig.message.error.internalError
        };
    }
});

module.exports = router;
