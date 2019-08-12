
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('sms_daily_report', (t) => {
          t.increments();
          t.string('job_code');
          t.string('fup_no');
          t.timestamp('date');
          t.decimal('working_hr');
          t.longtext('description');
          t.string('remark');

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
        knex.schema.dropTable('sms_daily_report'),
    ]); 
};
