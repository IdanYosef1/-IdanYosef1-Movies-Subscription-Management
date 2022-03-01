const mongoose = require('mongoose');
const schema = mongoose.Schema;

const membersScema = new schema({
    name:{type:String, required:true},
    email:{type:String, unique: true, required:true},
    city:{type:String, required:true}
})

module.exports = mongoose.model('members', membersScema);