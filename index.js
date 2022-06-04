const express = require('express');
let jsonData= require('./data.json');

const { append } = require('express/lib/response');

const app = express();
const port = 3000;

// Use css
app.use('/static', express.static('public'))
app.use(express.static('public/images'));

//connect pug view
app.set('view engine', 'pug');

//Get pages (get method for each page)
app.get("/", (req, res) => {
    res.render('index', {name: "Maria Vasquez", json: jsonData});
})

app.get("/project", (req, res) => {
    res.render('project', {json: jsonData});
})

app.get("/index", (req, res) => {
    res.render('layout');
})

app.get("/about", (req, res) => {
    res.render('about');
})

// Handle error pages 
app.use((req, res, next) => {
    const err = new Error('Not Found')
    err.status =404;
    next(err);
  })
  
  app.use((err, req, res, next) => {
    res.render('error', {error: err});
  });


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})

/*

app.post("/", (req, res) => {
    let weight = parseFloat(req.body.weight);
    let height = parseFloat(req.body.height);
    let bmi = weight / Math.pow((height / 100), 2);
    bmi = bmi.toFixed(1);

    res.render('bmi', {bmiResult: "Your bmi is: " + bmi});
})

*/