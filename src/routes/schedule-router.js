const Router = require('koa-router');
//const userQueries = require('../services/users');
const scheduleQueries = require('../services/schedule');
const messageConfig = require('../config/msgConfig');
//const jwt = require('../middlewares/jwt');

const router = new Router();
const BASE = '/schedules';

router.get(BASE, async(ctx) => {
    try{
        //console.log('I am here....');
        const schedules = await scheduleQueries.getAllSchedules();
        //console.log('Testing:' . JSON.stringify(users));

        ctx.body = {
            status: messageConfig.status.success,
            data: schedules
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
        const schedule = await scheduleQueries.getScheduleById(ctx.params.id);        

            ctx.body = {
                status: messageConfig.status.success,
                data: schedule
            };
        
    } catch(err) {
        ctx.status = 400;
        ctx.body = {
            status: messageConfig.status.error,
            message: err.message || messageConfig.message.error.internalError
        };
    }
});

router.get(`${BASE}/status/:status`, async ctx => {
    try {
      //console.log('I am here....');
      const schedules = await scheduleQueries.getShceduleByScheduleJobStatus(ctx.params.status);
      //console.log('Testing:' . JSON.stringify(users));
  
      ctx.body = {
        status: messageConfig.status.success,
        data: schedules
      };
    } catch (err) {
      ctx.status = 400;
      ctx.body = {
        status: messageConfig.status.error,
        message: err.message || messageConfig.message.error.internalError
      };
    }
  });

  router.get(`${BASE}/schedule/:job_code`, async ctx => {
    try {
      //console.log('I am here....');
      const schedules = await scheduleQueries.getShceduleByScheduleJobCode(ctx.params.job_code);
      //console.log('Testing:' . JSON.stringify(users));
  
      ctx.body = {
        status: messageConfig.status.success,
        data: schedules
      };
    } catch (err) {
      ctx.status = 400;
      ctx.body = {
        status: messageConfig.status.error,
        message: err.message || messageConfig.message.error.internalError
      };
    }
  });

router.post(`${BASE}`,  async (ctx) => {
    try {        
        const schedule = await scheduleQueries.addSchedule(ctx.request.body);
        console.log(ctx.request.body)    
           
        if(schedule && schedule != 'error') {
            ctx.status = 201;
            ctx.body = {
                status: messageConfig.status.success,
                data: schedule
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
        const schedule = await scheduleQueries.updateSchedule(ctx.params.id, ctx.request.body);                
        if(schedule && schedule != 'error') {
            ctx.status = 200;
            ctx.body = {
                status: 'success',
                data: schedule
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
        const schedule = await scheduleQueries.deleteSchedule(ctx.params.id);         
        if(schedule && schedule != 'error') {
            ctx.status = 200;
            ctx.body = {
                status: 'success',
                data: schedule
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
