const mongo = require('mongoose');






const loginSchema = new mongo.Schema({
    firstname: String,
    lastname: String,
    username: String,
    password: String,
  });
const loginModel = mongo.model('login1', loginSchema);


