// Create web server

// Import modules
const express = require('express');
const bodyParser = require('body-parser');

// Import database
const db = require('./db');

// Create web server
const app = express();

// Set port
const port = 3000;

// Set body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set view engine
app.set('view engine', 'pug');
app.set('views', './views');

// Set static file
app.use(express.static('public'));

// Set routes
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/comments', (req, res) => {
    res.render('comments', {
        comments: db.get('comments').value()
    });
});

app.post('/comments', (req, res) => {
    db.get('comments').push(req.body).write();
    res.redirect('/comments');
});

// Listen port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});