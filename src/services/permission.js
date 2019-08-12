const knex = require("../db/connection");
const messageConfig = require("../config/msgConfig");

function getAllPermission() {
  return knex("sms_usr_role")
    .select("*")
    .orderBy("id", "desc");
}

async function getPermissionById(id) {
  const permission = await knex("sms_usr_role")
    .select("*")
    .where({ id: parseInt(id) });
  return permission[0];
}

async function addPermission(permission) {
  return knex
    .transaction(trx => {
      return knex("sms_usr_role")
        .insert(permission)
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
        return getPermissionById(response);
      }
    })
    .catch(err => {
      console.error(err);
    });
}

async function updatePermission(id, permission) {
  return knex
    .transaction(async trx => {
      return knex("sms_usr_role")
        .transacting(trx)
        .update(permission)
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
        return getPermissionById(id);
      } else {
        return "error";
      }
    })
    .catch(err => {
      // console.error(err);
    });
}

async function deletePermission(id) {
  return knex
    .transaction(async trx => {
      return knex("sms_usr_role")
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
  getAllPermission,
  getPermissionById,
  addPermission,
  updatePermission,
  deletePermission
};
