const knex = require("../db/connection");
const messageConfig = require("../config/msgConfig");

function getAllModule() {
  return knex("sms_module")
    .select("*")
    .orderBy("id", "desc");
}

async function getModuleById(id) {
  const myModule = await knex("sms_module")
    .select("*")
    .where({ id: parseInt(id) });
  return myModule[0];
}

async function addModule(myModule) {
  return knex
    .transaction(trx => {
      return knex("sms_module")
        .insert(myModule)
        .transacting(trx)
        .then(response => {
          console.log("Response is " + JSON.stringify(response));
          if (response[0] > 0) {
            return response[0];
          } else {
            throw "error";
          }
        })
        .then(trx.commit)
        .catch(err => {
          trx.rollback;
          console.error("Exception error....", err);
          return "error";
        });
    })
    .then(response => {
      console.log(response);
      console.log("Transaction object return object: ", response);
      if (response && response == "error") {
        return "error";
      } else {
        return getModuleById(response);
      }
    })
    .catch(err => {
      console.error(err);
    });
}

async function updateModule(id, myModule) {
  return knex
    .transaction(async trx => {
      return knex("sms_module")
        .transacting(trx)
        .update(myModule)
        .where({ id: parseInt(id) })
        .then(response => {
          // console.log('Response is ' + JSON.stringify(response));
          if (response > 0) {
            return "success";
          } else {
            return "error";
          }
        })
        .then(trx.commit)
        .catch(err => {
          trx.rollback;
          // console.error('Exception error....' + err);
          return "error";
        });
    })
    .then(response => {
      // console.log('Transaction object return object: ' + response);
      if (response && response == "success") {
        return getModuleById(id);
      } else {
        return "error";
      }
    })
    .catch(err => {
      // console.error(err);
    });
}

async function deleteModule(id) {
  return knex
    .transaction(async trx => {
      return knex("sms_module")
        .transacting(trx)
        .del()
        .where({ id: parseInt(id) })
        .then(response => {
          if (response) {
            return "success";
          } else {
            return "error";
          }
        })
        .then(trx.commit)
        .catch(err => {
          trx.rollback;
          return "error";
        });
    })
    .then(response => {
      if (response && response == "success") {
        return "success";
      } else {
        return "error";
      }
    })
    .catch(err => {
      // console.error(err);
    });
}

module.exports = {
  getAllModule,
  getModuleById,
  addModule,
  updateModule,
  deleteModule
};
