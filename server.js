require('dotenv').config()

const express = require("express")
const axios = require("axios")
const app = express()
const TOKEN = process.env.TOKEN

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.set("view engine", "ejs")

app.get('/', (req, res, next) => {
    console.debug("> Homepage");
    console.debug(TOKEN);
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
    console.log(`The followinf request will be sent: https://api.github.com/users/${ req.params.devId }/repos`)
    axios.get(`https://api.github.com/users/${ req.params.devId }/repos`).then(response => {
        // console.log(response)
    }).catch(error => {
        console.debug("> Error during get repos request");
    })
    res.render("users/dashboard", { developer: req.params.devId });
});

app.listen(3000)