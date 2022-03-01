const mongoose = require('mongoose');
const schema = mongoose.Schema;

const moviesSchema = new schema({
    name:{type:String, required:true},
    genres:[
        {type:String,required:true}
    ],
    image:{type:String, required:true},
    premiered:{type:Date, required:true}
})

module.exports = mongoose.model('Movies', moviesSchema);