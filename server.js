const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var application = express();

hbs.registerPartials(__dirname + '/views/partials');
application.set('view engine', 'hbs');

application.use((req, res, next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log');
        }
    });
    next();
});

// application.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

application.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear()
});
hbs.registerHelper('screamIt', (text) => {
   return text.toUpperCase();
});

application.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home',
        welcomeMessage: 'This is a generic welcome message'
    });
    // resp.send('<h1>Hello Express!</h1>');
    // resp.send({
    //     name: 'Rkane',
    //     likes: [
    //         'Gaming',
    //         'Spaceships'
    //     ]
    // });
});

application.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

application.get('/bad', (req, res) => {
    res.send({
        error: 200,
        message: 'Something something bad url'
    });
});

application.listen(3000, () => {
    console.log('Server is running on port 3000');
});