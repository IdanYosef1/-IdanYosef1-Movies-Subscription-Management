const express = require('express');
const cors = require('cors');
const connectDB = require('./Config/database');
const app = express();

app.use(express.json())
app.use(cors());
connectDB();

const routerUsers = require('./Routes/users');
app.use('/api/users', routerUsers);
const routerUsersJson = require('./Routes/usersJson');
app.use('/api/usersJson', routerUsersJson);
const routerPermissions = require('./Routes/permissions');
app.use('/api/permissions', routerPermissions);

const routerMovies = require('./Routes/movies');
app.use('/api/movies',routerMovies);
const routerMembers = require('./Routes/members');
app.use('/api/members', routerMembers);
const routerSubscriptions = require('./Routes/subscriptions');
app.use('/api/subscriptions', routerSubscriptions);

app.listen(8000, () => console.log('app is listening on port 8000'));
