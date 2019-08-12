const knex = require("../db/connection");
const messageConfig = require("../config/msgConfig");

function getAllSchedules() {
  return knex("sms_schedule").select("*").orderBy('id', 'desc');
}

async function getScheduleById(id) {
  const model = await knex("sms_schedule")
    .select("*")
    .where({ id: parseInt(id) });
  return model[0];
}

async function getShceduleByScheduleJobStatus(status) {
  const schedules = await knex("sms_schedule")
    .select("*")
    .where({ schedule_job_status: status });
  return schedules;
}

async function getShceduleByScheduleJobCode(job_code) {
  const schedules = await knex("sms_schedule")
    .select("*")
    .where({ job_code: job_code });
  return schedules;
}

async function addSchedule(schedule) {
  return knex
    .transaction(trx => {
      return knex("sms_schedule")
        .insert(schedule)
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
          console.error("Exception error...." + err);
          return "error";
        });
    })
    .then(response => {
      console.log(response);
      console.log("Transaction object return object: " + response);
      if (response && response == "error") {
        return "error";
      } else {
        return getScheduleById(response);
      }
    })
    .catch(err => {
      console.error(err);
    });
}

async function updateSchedule(id, schedule) {
  return knex
    .transaction(async trx => {
      return knex("sms_schedule")
        .transacting(trx)
        .update(schedule)
        .where({ id: parseInt(id) })
        .then(response => {
          if (response > 0) {
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
        return getScheduleById(id);
      } else {
        return "error";
      }
    })
    .catch(err => {});
}

async function deleteSchedule(id) {
  return knex
    .transaction(async trx => {
      return knex("sms_schedule")
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
    .catch(err => {});
}

module.exports = {
  getAllSchedules,
  getScheduleById,
  addSchedule,
  updateSchedule,
  deleteSchedule,
  getShceduleByScheduleJobStatus,
  getShceduleByScheduleJobCode
};
