const express = require("express");
const cors = require("cors");
const connectDB = require("./Config/database");
const app = express();

app.use(express.json());
app.use(cors());
connectDB();

const routerMovies = require("./Routes/movies");
app.use("/api/movies", routerMovies);
const routerMembers = require("./Routes/members");
app.use("/api/members", routerMembers);
const routerSubscriptions = require("./Routes/subscriptions");
app.use("/api/subscriptions", routerSubscriptions);

const urlMovies = 'https://api.tvmaze.com/shows';
const urlMembers = 'https://jsonplaceholder.typicode.com/users'
const moviesBll = require('./BLL/moviesBLL')
const membersBll = require('./BLL/membersBLL')

app.listen(8001, () => {
    moviesBll.insertMovies(urlMovies)
    membersBll.insertMembers(urlMembers)
    console.log("app is listening on port 8001")
});
