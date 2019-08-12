
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('sms_complain', (t) => {
          t.increments();
          t.string('complain_no').notNullable().unique();
          t.string('model_no');
          t.string('fup_no');
          t.string('warranty_year');
          t.string('working_hr');
          t.longtext('warranty_description');
          t.string('customer_name');
          t.string('customer_phone_no');
          t.timestamp('date');
          t.string('distance');
          t.string('location');
          t.decimal('amount');
          t.string('job_title');
          t.string('complain_job_title');
          t.longtext('description');

          // state
          // Accept { accept } or Reject { reject }
          t.text('complain_status');

          // Table Default Fields
          t.timestamp('created_at').defaultTo(knex.fn.now());      
          t.string('created_by').notNullable();
          t.timestamp('updated_at').defaultTo(knex.fn.now());
          t.string('updated_by').notNullable();
          t.integer('version_no').defaultTo(1);
          t.boolean('status').defaultTo(true);
          t.decimal('sort_order_no').defaultTo(0);      
        })
      ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('sms_complain')
      ]);
};
