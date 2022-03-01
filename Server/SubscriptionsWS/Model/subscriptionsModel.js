const mongoose = require('mongoose');
const schema = mongoose.Schema;

const subscriptionsSchema = new schema({
    memberId:{type:mongoose.Schema.Types.ObjectId, required:true},
    movies:[{
        movieId:{type:mongoose.Schema.Types.ObjectId} ,
        date:{type:Date}
    }],
 
})

module.exports = mongoose.model('subscriptions', subscriptionsSchema);