const mongoose = require('mongoose');

const connectDB = () => {
    const uri = 'mongodb+srv://IdanYosef:Idany158@cluster0.zyy7x.mongodb.net/UsersDB?retryWrites=true&w=majority';
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
    mongoose.connect(uri,options);
}

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

module.exports = connectDB;
