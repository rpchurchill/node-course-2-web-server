const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.Port || 3000;  //for Heroku deployment

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log.')
    }
  });
  next();
});

//app.use((req, res, next) => {
//  res.render('maintenance.hbs');
//});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  //res.send('<h1>Hello Express!</h1>');
  /*res.send({
    name: 'Achmed',
    likes: [
      'Pittsburgh',
      'Fred Flintstone',
      'peace and quiet'
    ]
  });  */
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'What up, home?  Welcome to this page, n\'shit.',
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

app.get('/bad', (req, res) => {
  res.send({
    responseCode: 400,
    responseText: 'Error processing request'
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`); 
});