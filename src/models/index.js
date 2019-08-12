const user = require("./user")

module.exports = function(app) {
  app.models = {
    user,
  }
}