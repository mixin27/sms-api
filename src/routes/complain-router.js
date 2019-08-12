const Router = require('koa-router');
const complainQueries = require('../services/complain');
const messageConfig = require('../config/msgConfig');
const jwt = require('../middlewares/jwt');

const router = new Router();
const BASE = '/complains';

router.get(BASE, async(ctx) => {
    try{
        //console.log('I am here....');
        const complains = await complainQueries.getAllComplains();
        //console.log('Testing:' . JSON.stringify(users));

        ctx.body = {
            status: messageConfig.status.success,
            data: complains
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
        const complain = await complainQueries.getComplainById(ctx.params.id);        

            ctx.body = {
                status: messageConfig.status.success,
                data: complain
            };
        
    } catch(err) {
        ctx.status = 400;
        ctx.body = {
            status: messageConfig.status.error,
            message: err.message || messageConfig.message.error.internalError
        };
    }
});

router.get(`${BASE}/complain/:complain_no`,  async (ctx) => {
    try {        
        const complain = await complainQueries.getComplainByComplainNo(ctx.params.complain_no);        

            ctx.body = {
                status: messageConfig.status.success,
                data: complain
            };
        
    } catch(err) {
        ctx.status = 400;
        ctx.body = {
            status: messageConfig.status.error,
            message: err.message || messageConfig.message.error.internalError
        };
    }
});

router.post(`${BASE}`, async (ctx) => {
    try {        
        const complain = await complainQueries.addComplain(ctx.request.body);    
        // console.log('Date received from router class: ' + JSON.stringify(user));           
        if(complain && complain != 'error') {
            ctx.status = 201;
            ctx.body = {
                status: messageConfig.status.success,
                data: complain
            };
        } else {            
            ctx.status = 404;
            ctx.body = {
                status: messageConfig.status.error,
                message: messageConfig.message.error.fileNotFound
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
        const complain = await complainQueries.updateComplain(ctx.params.id, ctx.request.body);                
        if(complain && complain != 'error') {
            ctx.status = 200;
            ctx.body = {
                status: 'success',
                data: complain
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

router.put(`${BASE}/complain/:complain_no`, async (ctx) => {
    try {        
        const complain = await complainQueries.updateComplainByComplainNo(ctx.params.complain_no, ctx.request.body);                
        if(complain && complain != 'error') {
            ctx.status = 200;
            ctx.body = {
                status: 'success',
                data: complain
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

router.delete(`${BASE}/:id`, async (ctx) => {
    try {        
        const complain = await complainQueries.deleteComplain(ctx.params.id); 
        // console.log('User router delete: ' + JSON.stringify(user));        
        if(complain && complain != 'error') {
            ctx.status = 200;
            ctx.body = {
                status: 'success',
                data: complain
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