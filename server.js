const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res, next) => {
    console.log('here');
    res.render("index", { text12: "world" });
});

const userRouter = require('./routes/users');
app.use('/users', userRouter);

app.listen(3000);