const express = require('express');
const mongoose = require('mongoose');
const User = require('./model/user');
const bodyParser = require("body-parser");
require('dotenv/config');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());
app.use('/users', userRoutes);

mongoose.connect(
    process.env.DB_CONNECT,
    () => { console.log('Connected to db') }
);

app.listen(process.env.PORT);