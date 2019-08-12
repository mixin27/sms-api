const Router = require('koa-router');
//const userQueries = require('../services/users');
const deptsQueries = require('../services/department');
const messageConfig = require('../config/msgConfig');
//const jwt = require('../middlewares/jwt');

const router = new Router();
const BASE = '/departments';

router.get(BASE, async(ctx) => {
    try{
        //console.log('I am here....');
        const department = await deptsQueries.getAllDepartment();
        //console.log('Testing:' . JSON.stringify(users));

        ctx.body = {
            status: messageConfig.status.success,
            data: department
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
        const department = await deptsQueries.getDepartmentById(ctx.params.id);        

            ctx.body = {
                status: messageConfig.status.success,
                data: department
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
        const department = await deptsQueries.addDepartment(ctx.request.body);
        console.log(ctx.request.body)    
           
        if(department && department != 'error') {
            ctx.status = 201;
            ctx.body = {
                status: messageConfig.status.success,
                data: department
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
        const department = await deptsQueries.updateDepartment(ctx.params.id, ctx.request.body);                
        if(department && department != 'error') {
            ctx.status = 200;
            ctx.body = {
                status: 'success',
                data: department
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
        const department = await deptsQueries.deleteDepartment(ctx.params.id); 
        console.log(department)
        
        if(department && department != 'error') {
            ctx.status = 200;
            ctx.body = {
                status: 'success',
                data: department
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
