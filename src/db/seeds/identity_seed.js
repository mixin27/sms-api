const bcrypt = require('bcryptjs');

var users = [
  {
    id: 1, 
    user_name: 'default-super-admin',
    email: 'superadmin@hyundai.com',
    email_confirmed: false,
    password_hash: bcrypt.hashSync('test'),
    phone_no: '09788885091',
    phone_no_confirmed: false,
    role: 'super-admin',
    two_factor_enabled: false,
    created_by: 'default-super-admin',
    updated_by: 'default-super-admin'
  },
  {
    id: 2,
    user_name: 'default-admin',
    email: 'info@irrasoft.com',
    email_confirmed: false,
    password_hash: bcrypt.hashSync('test'),
    phone_no: '09788885090',
    phone_no_confirmed: false,
    role: 'admin',
    two_factor_enabled: false,
    created_by: 'default-super-admin',
    updated_by: 'default-super-admin'
  },
  {
    id: 3,
    user_name: 'default-user',
    email: 'serviceman@hyundai.com',
    email_confirmed: false,
    password_hash: bcrypt.hashSync('test'),
    phone_no: '09788885092',
    phone_no_confirmed: false,
    role: 'guest',
    two_factor_enabled: false,
    created_by: 'default-super-admin',
    updated_by: 'default-super-admin'
  }
];

var roles = [
  {
    id: 1,
    name: 'super-admin',
    description: 'Super Admin Role',
    created_by: 'super-admin',
    updated_by: 'super-admin'
  },
  {
    id: 2,
    name: 'admin',
    description: 'Admin Role',
    created_by: 'super-admin',
    updated_by: 'super-admin'
  },
  {
    id: 3,
    name: 'guest',
    description: 'Guest Role',
    created_by: 'super-admin',
    updated_by: 'super-admin'
  },
  {
    id: 4,
    name: 'service-man',
    description: 'Service Man Role',
    created_by: 'super-admin',
    updated_by: 'super-admin'
  }
];

var userRoles = [
  {id: 1, user_id: 1, role_id: 1},
  {id: 2, user_id: 2, role_id: 2},
  {id: 3, user_id: 3, role_id: 3}
];

exports.seed = function(knex, Promise) {
  return knex('sms_usr_role').del()
  .then(() => {
    return knex('sms_usr').del();
  })
  .then(() => {
    return knex('sms_role').del();
  })
  .then(() => {
    return knex('sms_usr').insert(users);
  })
  .then(() => {
    return knex('sms_role').insert(roles);
  })
  .then(() => {
    return knex('sms_usr_role').insert(userRoles);
  })
};
