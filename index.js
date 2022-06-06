const express = require('express');
const { redirect } = require('express/lib/response');
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

app.get("/project:projectName", (req, res) => {
    const projectTitle = req.params.projectName;

    jsonData.projects.forEach(project => {
        const storedTitle = project['project_name'];

        if(storedTitle == projectTitle){
            const description = project['description']
            const techonologies = project['technologies']
            const images = project['image_urls']
            const github = project['github_repository']
            const demo = project['live_demo']

            res.render('project', {json: jsonData, title: projectTitle, description: description, techonologies: techonologies, images: images, github: github, demo: demo})
        }
    });

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