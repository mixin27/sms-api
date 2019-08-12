exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable("sms_schedule", t => {
      t.increments();
      t.string("job_code")
        .notNullable()
        .unique();

      t.string("complain_no")
        .notNullable();
      t.string("fup_no")
        .notNullable();
        t.string("model_no")
        .notNullable();

      t.datetime("start_date");
      t.datetime("end_date");
      t.decimal("ammount");
      t.decimal("service_charge");
      t.string("inspection"); // Yes | No
      t.string("watching_list"); // Yes | No
      t.string("schedule_job_title");
      t.string("schedule_job_status");
      t.string("schedule_job_description");

      // [emp_code, ...]
      t.text("emp_code");

      t.text("interval");

      // Table Default Fields
      t.timestamp("created_at").defaultTo(knex.fn.now());
      t.string("created_by").notNullable();
      t.timestamp("updated_at").defaultTo(knex.fn.now());
      t.string("updated_by").notNullable();
      t.integer("version_no").defaultTo(1);
      t.boolean("status").defaultTo(true);
      t.decimal("sort_order_no").defaultTo(0);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable("sms_schedule")]);
};
