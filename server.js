const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res, next) => {
    console.log('homepage');
    res.render("homepage", { text12: "world" });
});

const userRouter = require('./routes/users');
app.use('/users', userRouter);

app.listen(3000);