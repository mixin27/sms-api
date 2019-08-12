const knex = require('../db/connection');
const messageConfig = require('../config/msgConfig');

function getAllMachine() {
    return knex('sms_machine')
    .select('*').orderBy('id', 'desc');
}

async function getmachineById(id) {
    const machine = await knex('sms_machine')
    .select('*')
    .where({ id: parseInt(id) });
    return machine[0]
}

async function addMachine(machine) {

    return knex.transaction((trx) => {
        return knex('sms_machine')
        .insert(machine)
        .transacting(trx)
        .then((response) => {
            console.log('Response is ' + JSON.stringify(response));
            if(response[0] > 0) {
                return response[0];
            } else {
                throw('error');
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
        console.log(response)
        console.log('Transaction object return object: ', response);
        if(response && response == 'error') {
            return 'error';
        } else {
            return getmachineById(response);
        }
    })  
    .catch((err) => {
        console.error(err);
    });    
}

async function updateMachine(id, machine) {
    return knex.transaction(async (trx) => {
        return knex('sms_machine')
        .transacting(trx)
        .update(machine)
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
            return getmachineById(id);
        } else {
            return 'error';
        }
    })   
    .catch((err) => {
        // console.error(err);
    });
}

async function deleteMachine(id) {
    return knex.transaction(async (trx) => {
        return knex('sms_machine')
        .transacting(trx)
        .del()
        .where({ id: parseInt(id) })
        .then((response) => {
            if(response) {
                return 'success';
            } else {
                return 'error';
            }
        }) 
        .then(trx.commit)                       
        .catch((err) => {
            trx.rollback;
            return 'error'
        });
    })
    .then((response) => { 
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
    getAllMachine,
    getmachineById,
    addMachine,
    updateMachine,
    deleteMachine
};