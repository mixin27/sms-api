const knex = require("../db/connection");
const messageConfig = require("../config/msgConfig");

function getAllRoles() {
  return knex("sms_role")
    .select("*")
    .orderBy("id", "desc");
}

async function getRoleById(id) {
  const role = await knex("sms_role")
    .select("*")
    .where({ id: parseInt(id) });
  return role[0];
}

async function addRole(role) {
  return knex
    .transaction(trx => {
      return knex("sms_role")
        .insert(role)
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
        return getRoleById(response);
      }
    })
    .catch(err => {
      console.error(err);
    });
}

async function updateRole(id, role) {
  return knex
    .transaction(async trx => {
      return knex("sms_role")
        .transacting(trx)
        .update(role)
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
        return getRoleById(id);
      } else {
        return "error";
      }
    })
    .catch(err => {
      // console.error(err);
    });
}

async function deleteRole(id) {
  return knex
    .transaction(async trx => {
      return knex("sms_role")
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
  getAllRoles,
  getRoleById,
  addRole,
  updateRole,
  deleteRole
};
