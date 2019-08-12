// Update with your config settings.
const path = require("path");

const BASE_PATH = path.join(__dirname, "src", "db");

module.exports = {
  // test: {
  //   client: 'mysql',
  //   connection: {
  //     host: '127.0.0.1',
  //     user: 'root',
  //     password: 'weareone',
  //     database: 'sms_test_db'
  //   },
  //   migrations: {
  //     directory: path.join(BASE_PATH, 'migrations')
  //   },
  //   seeds: {
  //     directory: path.join(BASE_PATH, 'seeds')
  //   }
  // },
  development: {
    client: "mysql",
    connection: {
      host: "178.128.111.238",
      user: "nodejsuser",
      password: "W#ERX%67YU",
      database: "sms_db_teamf"
    },
    migrations: {
      directory: path.join(BASE_PATH, "migrations")
    },
    seeds: {
      directory: path.join(BASE_PATH, "seeds")
    }
  }
  // development: {
  //   client: 'mysql',
  //   connection: {
  //     host: '127.0.0.1',
  //     user: 'root',
  //     password: 'password',
  //     database: 'sms_db'
  //   },
  //   migrations: {
  //     directory: path.join(BASE_PATH, 'migrations')
  //   },
  //   seeds: {
  //     directory: path.join(BASE_PATH, 'seeds')
  //   }
  // }
  // ,
  // production: {
  //   client: 'mysql',
  //   connection: {
  //     host: '127.0.0.1',
  //     user: 'root',
  //     password: 'password',
  //     database: 'budget_flow_db'
  //   },
  //   migrations: {
  //     directory: path.join(BASE_PATH, 'migrations')
  //   },
  //   seeds: {
  //     directory: path.join(BASE_PATH, 'seeds')
  //   }
  // }
};
