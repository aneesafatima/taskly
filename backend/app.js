const express = require('express');
const userRouter = require('./routes/userRouter')
const app = express(); //app is an instance of express
app.use(express.json());

app.use('/api/users', userRouter);


module.exports = app;