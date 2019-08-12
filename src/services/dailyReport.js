const knex = require('../db/connection');
var bcrypt = require('bcryptjs');
const messageConfig = require('../config/msgConfig');

function getDailyReport() {
    return knex('sms_daily_report')
    .select('*').orderBy('id', 'desc');
}

async function getDailyReportById(id) {
    const dailyReport = await knex('sms_daily_report')
    .select('*')
    .where({ id: parseInt(id) });
    return dailyReport[0]
}

async function getDailyReportByJobCode(job_code) {
    const dailyReports = await knex('sms_daily_report')
    .select('*')
    .where({ job_code: job_code });
    return dailyReports
}

async function getDailyReportByJobCodeAndDate(job_code, date) {
    const dailyReport = await knex('sms_daily_report')
    .select('*')
    .where({ job_code: job_code, date: date });
    return dailyReport
}

function addDailyReport(report) {
   
    return knex.transaction((trx) => {
        return knex('sms_daily_report')
        .insert(report)
        .transacting(trx)
        .then((response) => {
            console.log('Response is ' + JSON.stringify(response));
            if(response[0] > 0) {
                return response[0];
            } else {
                return 'error';
            }
        }) 
        .then(trx.commit)
        .catch((err) => {
            trx.rollback;
            console.error('Exception error....', err);
            return 'error'
        });
    })
    .then((response) => { 
        console.log('Transaction object return object: ', response);
        if(response && response == 'error') {
            return 'error';
        } else {
            console.log('getEmployeeById ', response)
            return getDailyReportById(response);
        }
    })  
    .catch((err) => {
        console.error(err);
    });    
}

async function updateDailyReport(id, report) {
    return knex.transaction(async (trx) => {
        return knex('sms_daily_report')
        .transacting(trx)
        .update(report)
        .where({ id: parseInt(id) })  
        .then((response) => {
            // console.log('Response is ' + JSON.stringify(response)); 
            if(response > 0) {
                return 'success';
            } else {
                return 'error';
            }
        }) 
        .then(trx.commit)                       
        .catch((err) => {
            trx.rollback;
            // console.error('Exception error....' + err);
            return 'error'
        });
    })
    .then((response) => { 
        // console.log('Transaction object return object: ' + response);
        if(response && response == 'success') {
            return getDailyReportById(id);
        } else {
            return 'error';
        }
    })   
    .catch((err) => {
        // console.error(err);
    });
}

async function deleteDailyReport(id) {
    return knex.transaction(async (trx) => {
        return knex('sms_daily_report')
        .transacting(trx)
        .del()
        .where({ id: parseInt(id) })  
        .then((response) => {
            // console.log('Response is ' + JSON.stringify(response)); 
            if(response > 0) {
                return 'success';
            } else {
                return 'error';
            }
        }) 
        .then(trx.commit)                       
        .catch((err) => {
            trx.rollback;
            // console.error('Exception error....' + err);
            return 'error'
        });
    })
    .then((response) => { 
        // console.log('Transaction object return object: ' + response);
        if(response && response == 'success') {
            return 'success';
        } else {
            return 'error';
        }
    })   
    .catch((err) => {
        // console.error(err);
    });
}

module.exports = {
    getDailyReport,
    getDailyReportById,
    getDailyReportByJobCode,
    getDailyReportByJobCodeAndDate,
    addDailyReport,
    updateDailyReport,
    deleteDailyReport
};