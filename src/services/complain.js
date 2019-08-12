const knex = require("../db/connection");
var bcrypt = require("bcryptjs");
const messageConfig = require("../config/msgConfig");

function getAllComplains() {
  return knex("sms_complain")
    .select("*")
    .orderBy("id", "desc");
}

async function getComplainById(id) {
  const complain = await knex("sms_complain")
    .select("*")
    .where({ id: parseInt(id) });
  return complain[0];
}

async function getComplainByComplainNo(complainNo) {
  const complain = await knex("sms_complain")
    .select("*")
    .where({ complain_no: complainNo });
  return complain[0];
}

function addComplain(complain) {
  return knex
    .transaction(trx => {
      return knex("sms_complain")
        .insert(complain)
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
        return getComplainById(response);
      }
    })
    .catch(err => {
      console.error(err);
    });
}

// async function updateComplain(id, complain) {
//   console.log(complain)
//   return knex
//     .transaction(async trx => {
//       return knex("sms_complain")
//         .transacting(trx)
//         .update(complain)
//         .where({ id: parseInt(id) })
//         .then(response => {
//           // console.log('Response is ' + JSON.stringify(response));
//           if (response > 0) {
//             return "success";
//           } else {
//             return "error";
//           }
//         })
//         .then(trx.commit)
//         .catch(err => {
//           trx.rollback;
//           // console.error('Exception error....' + err);
//           return "error";
//         });
//     })
//     .then(response => {
//       console.log('Transaction object return object: ' + response);
//       if (response && response == "success") {
//         return getComplainById(id);
//       } else {
//         return "error";
//       }
//     })
//     .catch(err => {
//       // console.error(err);
//     });
// }
async function updateComplain(id, complain) {
  // console.log(complain)
  return knex
    .transaction(async trx => {
      return knex("sms_complain")
        .transacting(trx)
        .update(complain)
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
        return getComplainById(id);
      } else {
        return "error";
      }
    })
    .catch(err => {
      // console.error(err);
    });
}

async function updateComplainByComplainNo(complainNo, complain) {
  return knex
    .transaction(async trx => {
      return knex("sms_complain")
        .transacting(trx)
        .update(complain)
        .where({ complain_no: complainNo })
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
        return getComplainById(id);
      } else {
        return "error";
      }
    })
    .catch(err => {
      // console.error(err);
    });
}

async function deleteComplain(id) {
  return knex
    .transaction(async trx => {
      return knex("sms_complain")
        .transacting(trx)
        .del()
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
  getAllComplains,
  getComplainById,
  addComplain,
  updateComplain,
  deleteComplain,
  getComplainByComplainNo,
  updateComplainByComplainNo
};
