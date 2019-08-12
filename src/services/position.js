const knex = require('../db/connection');
const messageConfig = require('../config/msgConfig');

function getAllPostion() {
    return knex('sms_position')
    .select('*')
    .orderBy('id', 'desc');
}

async function getpositionById(id) {
    const model = await knex('sms_position')
    .select('*')
    .where({ id: parseInt(id) });
    return model[0]
}

async function addPosition(position) {

    return knex.transaction((trx) => {
        return knex('sms_position')
        .insert(position)
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
            return getpositionById(response);
        }
    })  
    .catch((err) => {
        console.error(err);
    });    
}

async function updatePosition(id, position) {
    return knex.transaction(async (trx) => {
        return knex('sms_position')
        .transacting(trx)
        .update(position)
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
            return getpositionById(id);
        } else {
            return 'error';
        }
    })   
    .catch((err) => {
        // console.error(err);
    });
}

async function deletePosition(id) {
    return knex.transaction(async (trx) => {
        return knex('sms_position')
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
    getAllPostion,
    getpositionById,
    addPosition,
    updatePosition,
    deletePosition
};