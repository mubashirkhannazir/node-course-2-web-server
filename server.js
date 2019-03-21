const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine' , 'hbs' );
app.use(express.static(__dirname + '/public'));
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}; ${req.method}; ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err){
            comsole.log('unable to append to server');
        }
    });
    next();
});

app.use((req, res, next) => {
    res.render('maintainance.hbs');
});

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
})
hbs.registerHelper('screamIt', (text) => {

    return text.toUpperCase();
})

app.get('/', (req, res) => {
   // res.send('<h1>Hello express</h1>');res.send({Name: 'Mubashir', likes: ['driving','laughing']})
    res.render('Home.hbs',{
        message: 'Hello this is an hbs rendered message',
        pageTitle: 'Home Page',
           
    })
});

app.get('/about', (req, res) => {
//     res.send('<h1>about page</h1>');
    res.render('about.hbs', {
        pageTitle: 'About Page',
        
    });
 });

app.get('/bad', (req, res) => {
    res.send({
        errorStatus: 'error occured',
        type: 404
    });

});

//app.use(express.static(__dirname + '/public'));

app.listen(3000);