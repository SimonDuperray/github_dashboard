const express = require("express")
const app = express()

// app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.set("view engine", "ejs")

app.get('/', (req, res, next) => {
    console.debug("> Homepage");
    res.render("homepage/home");
});

app.post("/", (req, res, next) => {
    console.debug("> form submitted");
    console.log(req.statusCode);
    console.log(req.body);
    res.redirect(`/${ req.body.devId }`);
});

app.get("/:devId", (req, res, next) => {
    res.render("users/dashboard", { developer: req.params.devId });
});

// app.post('/users', (req, res, next) => {
//     console.debug("> debug");
//     console.log(req.params);
//     res.redirect(`/users/${ req.params.devId }`);
// });

app.listen(3000)