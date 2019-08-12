exports.up = function(knex, Promise) {
    return Promise.all([
      knex.schema.createTable("sms_employee", t => {
        t.increments();
        t.string("emp_code")
          .notNullable()
          .unique();
        t.string("emp_name");
        t.string("gender");
        t.datetime("dob");
        t.string("nrc");
        t.string("position");
        t.string("department");
        t.datetime("job_start_date");
        t.string("phone_no");
        t.boolean("phone_no_confirmed").defaultTo(false);
        t.string("email");
        t.boolean("email_confirmed").defaultTo(false);
        t.longtext("permanent_address");
        t.longtext("temp_address");
        t.string("father_name");
        t.string("mother_name");
        t.string("education");
        t.longtext("social_media_link");
        t.text("image");

        // state [ 'Available', 'Busy']
        t.text('job_status');
  
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
    return Promise.all([knex.schema.dropTable("sms_employee")]);
  };  