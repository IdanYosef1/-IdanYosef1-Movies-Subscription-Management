const mongoose = require('mongoose');
const schema = mongoose.Schema;

const usersSchema = new schema({
    username:{type:String, unique:true, required:true},
    password:{type:String},
})

module.exports = mongoose.model('users', usersSchema);