const knex = require('../db/connection');
var bcrypt = require('bcryptjs');
const messageConfig = require('../config/msgConfig');

function getAllEmployee() {
    return knex('sms_employee')
    .select('*').orderBy('id', 'desc');
}

async function getEmployeeById(id) {
    const employee = await knex('sms_employee')
    .select('*')
    .where({ id: parseInt(id) });
    return employee[0]
}

async function getEmployeeByEmpCode(emp_code) {
    const employees = await knex('sms_employee')
    .select('*')
    .where({ emp_code: emp_code });
    return employees
}

async function getEmployeeByEmail(email) {
    const employee = await knex('sms_employee')
    .select('*')
    .where({ email: email });
    return employee[0]
}

async function getEmployeeByName(name) {
    const employee = await knex('sms_employee')
    .select('*')
    .where({ emp_name: name });
    return employee
}

async function getEmployeeByPosition(position) {
    const employees = await knex('sms_employee')
    .select('*')
    .where({ position: position });
    return employees
}

async function getEmployeeByPositionAndAvailable(position) {   
    const employees = await knex('sms_employee')        
    .select('*')
    .where({position: position, job_status: 'available'});
    return  employees
}

async function getEmployeeByStatus(status) {
    const employees = await knex('sms_employee')
    .select('*')
    .where({ position: "Service Man", job_status: status });
    return employees
}

function addEmployee(employee) {
   
    return knex.transaction((trx) => {
        return knex('sms_employee')
        .insert(employee)
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
            return getEmployeeById(response);
        }
    })  
    .catch((err) => {
        console.error(err);
    });    
}

async function updateEmployee(id, employee) {
    return knex.transaction(async (trx) => {
        return knex('sms_employee')
        .transacting(trx)
        .update(employee)
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
            return getEmployeeById(id);
        } else {
            return 'error';
        }
    })   
    .catch((err) => {
        // console.error(err);
    });
}

async function deleteEmployee(id) {
    return knex.transaction(async (trx) => {
        return knex('sms_employee')
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
    getAllEmployee,
    getEmployeeById,
    getEmployeeByEmail,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployeeByPosition,
    getEmployeeByPositionAndAvailable,
    getEmployeeByStatus,
    getEmployeeByEmpCode,
    getEmployeeByName
};