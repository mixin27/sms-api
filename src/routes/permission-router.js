const Router = require('koa-router');
const permissionQueries = require('../services/permission');
const messageConfig = require('../config/msgConfig');

const router = new Router();
const BASE = '/permissions';

router.get(BASE, async(ctx) => {
    try{
        
        const permissions = await permissionQueries.getAllPermission();

        ctx.body = {
            status: messageConfig.status.success,
            data: permissions
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
        const permission = await permissionQueries.getPermissionById(ctx.params.id);        
        ctx.body = {
            status: messageConfig.status.success,
            data: permission
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
        const permission = await permissionQueries.addPermission(ctx.request.body);    
        console.log(ctx.request.body)
        if(permission && permission != 'error') {
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
        const permission = await permissionQueries.updatePermission(ctx.params.id, ctx.request.body);                
        if(permission && permission != 'error') {
            ctx.status = 200;
            ctx.body = {
                status: 'success',
                data: permission
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
        const permission = await permissionQueries.deletePermission(ctx.params.id); 
        console.log(permission)
        if(permission && permission != 'error') {
            ctx.status = 200;
            ctx.body = {
                status: 'success',
                data: permission
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