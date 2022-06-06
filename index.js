const express = require('express');
let jsonData= require('./data.json');

const app = express();
const port = 3000;

// Read css files
app.use('/static', express.static('public'))
app.use(express.static('public/images'));

//connect pug view
app.set('view engine', 'pug');

//Get pages (get method for each page)
app.get("/", (req, res) => {
    res.render('index', {name: "Maria Vasquez", json: jsonData});
})

app.get("/index", (req, res) => {
    res.render('layout');
})

app.get("/about", (req, res) => {
    res.render('about', {name: "Maria Vasquez"});
})

app.get("/project:project1", (req, res) => {
    const projectTitle = req.params.project1;
    

    res.render('project', {json: jsonData});
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

// listen to port 
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})