const knex = require("../db/connection");
var bcrypt = require("bcryptjs");
const messageConfig = require("../config/msgConfig");

function getAccountAllUsers() {
  return knex("sms_usr").select("*");
}

// ============================================================

function getAllUsers() {
  return knex("sms_usr_role")
    .select("*")
    .from("sms_usr_role AS userrole")
    .leftJoin("sms_usr", "userrole.user_id", "sms_usr.id")
    .leftJoin("sms_role", "userrole.role_id", "sms_role.id");
}

async function getUserById(id) {
  const model = await knex("sms_usr_role")
    .select("*")
    .from("sms_usr_role AS userrole")
    .leftJoin("sms_usr", "userrole.user_id", "sms_usr.id")
    .leftJoin("sms_role", "userrole.role_id", "sms_role.id")
    .where({ "userrole.id": parseInt(id) });
  return model[0];
}

async function getCurrentUser(id) {
  const model = await knex("sms_usr_role")
    .select("*")
    .from("sms_usr_role AS userrole")
    .leftJoin("sms_usr", "userrole.user_id", "sms_usr.id")
    .leftJoin("sms_role", "userrole.role_id", "sms_role.id")
    .where({ "userrole.id": parseInt(id) });
  return model[0];
}

async function getUserByName(name) {
  const model = await knex("sms_usr_role")
    .select("*")
    .from("sms_usr_role AS userrole")
    .leftJoin("sms_usr", "userrole.user_id", "sms_usr.id")
    .leftJoin("sms_role", "userrole.role_id", "sms_role.id")
    .where({ email: name });
  return model[0];
}

// =============================================================

async function getAccountUserById(id) {
  const model = await knex("sms_usr")
    .select("*")
    .where({ id: parseInt(id) });
    
  return model[0];
}

function getUserByEmail(email) {
  return knex("sms_usr")
    .select("*")
    .where("email", email)
    .first();
}

function addUser(user) {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(user.password_hash, salt);
  user.password_hash = hash;
  return knex
    .transaction(trx => {
      return knex("sms_usr")
        .insert(user)
        .transacting(trx)
        .then(response => {
          console.log("Response is " + JSON.stringify(response));
          if (response[0] > 0) {
            return response[0];
          } else {
            return "error";
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
      console.log("Transaction object return object: ", response);
      if (response && response == "error") {
        return "error";
      } else {
        console.log("getUserById ", response);
        return getAccountUserById(response);
      }
    })
    .catch(err => {
      console.error(err);
    });
}

async function updateUser(id, user) {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(user.password_hash, salt);
  user.password_hash = hash;
  return knex
    .transaction(async trx => {
      return knex("sms_usr")
        .transacting(trx)
        .update(user)
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
        return getAccountUserById(id);
      } else {
        return "error";
      }
    })
    .catch(err => {
      // console.error(err);
    });
}

async function deleteUser(id) {
  return knex
    .transaction(async trx => {
      return knex("sms_usr_role")
        .transacting(trx)
        .del()
        .where({ user_id: parseInt(id) })
        .then(() => {
          return knex("sms_usr")
            .transacting(trx)
            .del()
            .where({ id: parseInt(id) });
        })
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
  getAccountAllUsers,
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
  getUserByName,
  getUserByEmail,
  getCurrentUser,
  getAccountUserById
};
