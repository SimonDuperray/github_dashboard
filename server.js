require('dotenv').config()

const express = require("express")
const axios = require("axios")
const app = express()
// var session = require('express-session')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// app.use(session({
//     isUserExists: true
// }));

app.set("view engine", "ejs")

const token = process.env.TOKEN
const password = process.env.PASSWORD

app.get('/', (req, res, next) => {
    console.debug("> Homepage");
    res.render("homepage/home");
});

app.post("/", (req, res, next) => {
    console.debug("> form submitted");
    console.debug(`The following request will be sent: https://api.github.com/users/${ req.body.devId }`)
    axios.get(`https://api.github.com/users/${ req.body.devId }`).then(response => {
        console.log(response.status)
        if(response.status==200){
            res.redirect(`/${ req.body.devId }`)
        }
    }).catch(error => {
        console.error("> Error detected during the request")
        res.render('homepage/home', { isUserExists: false, developer: req.body.devId })
    })
});

app.get("/:devId", (req, res, next) => {
    res.render("users/dashboard", { developer: req.params.devId });
});

app.listen(3000)