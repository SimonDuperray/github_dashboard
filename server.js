require('dotenv').config()

const express = require("express")
const axios = require("axios")
const app = express()
const fs = require('fs')
const TOKEN = process.env.TOKEN
const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/vnd.github.v3.raw',
    'Authorization': 'token '+TOKEN
}
var DEVELOPER = "";
var languages_values;
const colorsGraph = [
    {
        'bg': 'rgba(156, 163, 214, 0.2)',
        'border': 'rgba(156, 163, 214, 1)'
    },
    {
        'bg': 'rgba(207, 193, 232, 0.2)',
        'border': 'rgba(207, 193, 232, 1)'
    },
    {
        'bg': 'rgba(242, 213, 239, 0.2)',
        'border': 'rgba(242, 213, 239, 1)'
    },
    {
        'bg': 'rgba(247, 239, 218, 0.2)',
        'border': 'rgba(247, 239, 218, 1)'
    },
    {
        'bg': 'rgba(179, 221, 196, 0.2)',
        'border': 'rgba(179, 221, 196, 1)'
    },
    {
        'bg': 'rgba(200, 86, 107, 0.2)',
        'border': 'rgba(200, 86, 107, 1)'
    },
    {
        'bg': 'rgba(231, 137, 99, 0.2)',
        'border': 'rgba(231, 137, 99, 1)'
    },
    {
        'bg': 'rgba(242, 212, 143, 0.2)',
        'border': 'rgba(242, 212, 143, 1)'
    },
    {
        'bg': 'rgba(157, 117, 191, 0.2)',
        'border': 'rgba(157, 117, 191, 1)'
    },
    {
        'bg': 'rgba(158, 194, 153, 0.2)',
        'border': 'rgba(158, 194, 153, 1)'
    },
    {
        'bg': 'rgba(102, 97, 171, 0.2)',
        'border': 'rgba(102, 97, 171, 1)'
    },
    {
        'bg': 'rgba(180, 163, 144, 0.2)',
        'border': 'rgba(180, 163, 144, 1)'
    },
    {
        'bg': 'rgba(146, 126, 117, 0.2)',
        'border': 'rgba(146, 126, 117, 1)'
    },
    {
        'bg': 'rgba(121, 99, 99, 0.2)',
        'border': 'rgba(121, 99, 99, 1)'
    },
    {
        'bg': 'rgba(153, 168, 133, 0.2)',
        'border': 'rgba(153, 168, 133, 1)'
    },
    {
        'bg': 'rgba(212, 219, 186, 0.2)',
        'border': 'rgba(212, 219, 186, 1)'
    },
    {
        'bg': 'rgba(253, 237, 207, 0.2)',
        'border': 'rgba(253, 237, 207, 1)'
    }
]
const colorsIndexes = Array.from(Array(colorsGraph.length).keys())
var created_at = new Array()
var hours_dict = {
    '0->5': 0,
    '5->10': 0,
    '10->15': 0,
    '15->20': 0,
    '20->0': 0,
}

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.set("view engine", "ejs")

app.get('/', (req, res, next) => {
    console.debug("> Homepage");
    res.render("homepage/home");
});

app.post("/", (req, res, next) => {
    console.debug("> form submitted");
    console.debug(`The following request will be sent: https://api.github.com/users/${ req.body.devId }`)
    axios.get(`https://api.github.com/users/${ req.body.devId }`, headers).then(response => {
        console.log(response.status)
        if(response.status==200){
            DEVELOPER = req.body.devId
            res.redirect(`/dev/${ req.body.devId }`)
        }
    }).catch(error => {
        console.error("> Error detected during the request")
        res.redirect("/dev/SimonDuperray")
        // res.render('homepage/home', { isUserExists: false, developer: req.body.devId })
    })
});

app.get("/dev/:devId", (param_req, param_res, next) => {
    var RESPONSE = new Array();
    var avg_size;
    var avg_commits;
    const devId = param_req.params.devId
    console.log(param_req.params)
    console.log(`The followinf request will be sent: https://api.github.com/users/${ param_req.params.devId }/repos`)
    if(DEVELOPER!=""){
        // axios.get(`https://api.github.com/users/${ DEVELOPER }/repos`).then(response => {
        //     console.log(response.status)
        //     RESPONSE = response.data
        //     console.log(RESPONSE)

            // write response.data in json file
            // let data = JSON.stringify(response.data, 4)
            // fs.writeFileSync('./data.json', data)
            // console.debug("> JSON file printed")

            // parse json file
            // console.log(`There are ${RESPONSE.length} repos`)
            // console.log(typeof(RESPONSE))
            // console.log(Object.entries(RESPONSE)[0])
        // })
    } else {
        console.error("> DEVELOPER IS EMPTY")
        var reader = fs.readFileSync('./data.json')
        var parsed = JSON.parse(reader)

        // REPOS SIZES
        var sizes = new Array()
        for (var i = 0; i < parsed.length; i++) {
            sizes.push(parsed[i].size)
        }
        const sum = sizes.reduce((a, b) => a+b, 0)
        avg_size = Number(((sum / sizes.length)/1000).toFixed(1)) || 0;
        console.log(sizes)

        // NUMBER OF COMMITS PER REPOSITORY
        // nb_commits = new Array()
        // for (var i=0; i<parsed.length; i++){
        //     console.log(`-> https://api.github.com/repos/${param_req.params.devId}/${parsed[i].name}/commits`)
        //     axios.get(`https://api.github.com/repos/${param_req.params.devId}/${parsed[i].name}/commits`).then(response => {
        //         nb_commits.push(response.data.length)
        //     })
        // }
        // var sum_commits = nb_commits.reduce((a, b) => a+b, 0)
        // avg_commits = (sum_commits / nb_commits.length) || 0;

        // LANGUAGES
        var languages = new Array();
        for (var i=0; i<parsed.length; i++) {
            languages.push(parsed[i].language)
        }
        const languages_counted = {}
        for (const element of languages) {
            if(languages_counted[element]) {
                languages_counted[element]+=1
            } else {
                languages_counted[element]=1
            }
        }
        languages_keys = Object.keys(languages_counted)
        languages_values = Object.values(languages_counted)
        labels = languages_keys
        indexes = new Array()
        for (var i=0; i<labels.length; i++) {
            indexes.push(
                colorsIndexes[Math.floor(Math.random()*colorsIndexes.length)]
            )
        }
        var backgroundColor = new Array();
        var borderColor = new Array();
        for (var colorToAppend=0; colorToAppend<indexes.length; colorToAppend++) {
            backgroundColor.push(colorsGraph[colorToAppend].bg)
            borderColor.push(colorsGraph[colorToAppend].border)
        }
        borderWidth = 1;
        datag = languages_values;

        // CREATION HOUR
        for (var i=0; i<parsed.length; i++) {
            created_at.push(parsed[i].created_at.slice(11, 13))
        }
        created_at.forEach(hour => {
            let int_hour = parseInt(hour)
            console.log(`value: ${int_hour} - type: ${typeof(int_hour)}`)
            if(int_hour>0 && int_hour<5){
                hours_dict['0->5']+=1
            } else if(int_hour>=5 && int_hour<10){
                hours_dict['5->10']+=1
            } else if(int_hour>=15 && int_hour<20){
                hours_dict['15->20']+=1
            } else if(int_hour>=20 && int_hour<25){
                hours_dict['20->0']+=1
            }
        })
        hours = Object.keys(hours_dict)
        created_at_list = Object.values(hours_dict)
    }
    param_res.render("users/dashboard", { 
        developer: param_req.params.devId, 
        data: parsed, 
        avg_size: avg_size,
        avg_commits: avg_commits,

        labels: labels,
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: borderWidth,
        datag: datag,

        hours: hours,
        created_at_list: created_at_list
    });
});

app.listen(3000)