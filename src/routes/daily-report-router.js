const Router = require('koa-router');
const reportQueries = require('../services/dailyReport');
const messageConfig = require('../config/msgConfig');

const router = new Router();
const BASE = '/daily-reports';

router.get(BASE, async(ctx) => {
    try{
        
        const reports = await reportQueries.getDailyReport();

        ctx.body = {
            status: messageConfig.status.success,
            data: reports
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
        const report = await reportQueries.getDailyReportById(ctx.params.id);        
        ctx.body = {
            status: messageConfig.status.success,
            data: report
        };
    } catch(err) {
        ctx.status = 400;
        ctx.body = {
            status: messageConfig.status.error,
            message: err.message || messageConfig.message.error.internalError
        };
    }
});

router.get(`${BASE}/report/:job_code`, async ctx => {
    try {
      //console.log('I am here....');
      const report = await reportQueries.getDailyReportByJobCode(ctx.params.job_code);
      //console.log('Testing:' . JSON.stringify(users));
  
      ctx.body = {
        status: messageConfig.status.success,
        data: report
      };
    } catch (err) {
      ctx.status = 400;
      ctx.body = {
        status: messageConfig.status.error,
        message: err.message || messageConfig.message.error.internalError
      };
    }
  });

router.post(`${BASE}`,async (ctx) => {
    try {        
        const report = await reportQueries.addDailyReport(ctx.request.body);    
        console.log(ctx.request.body)
        if(report && report != 'error') {
            ctx.status = 201;
            ctx.body = {
                status: messageConfig.status.success,
                data: report
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
        const report = await reportQueries.updateDailyReport(ctx.params.id, ctx.request.body);                
        if(report && report != 'error') {
            ctx.status = 200;
            ctx.body = {
                status: 'success',
                data: report
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
        const report = await reportQueries.deleteDailyReport(ctx.params.id); 
        console.log(position)
        if(report && report != 'error') {
            ctx.status = 200;
            ctx.body = {
                status: 'success',
                data: report
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