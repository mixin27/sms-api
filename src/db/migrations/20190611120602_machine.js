
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('sms_machine', (t) => {
          t.increments();
          t.string('model_number').notNullable().unique();
          t.string('FUP_number');
          t.string('machine_serial_number');
          t.string('warranty_year');
          t.string('working_hour');
          t.string('location');

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
        knex.schema.dropTable('sms_machine'),
    ]); 
};
