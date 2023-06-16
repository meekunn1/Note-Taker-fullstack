const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 3001;

const app = express();

//middleware for parsing JSON and url encoded form data
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Middleware to serve up items from public folder.
app.use(express.static('public'));

//Route for base page to get index.html
app.get('/', (req, res) => 
res.sendFile(path.jpin(__dirname, '/public/index.html'))
);

//Route for notes page to get notes.html
app.get('/notes', (req, res) =>
res.sendFile(path.join(__dirname, '/public/notes.html'))
);

//all wildcard will be taken to index page
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () => {
    console.log(`App listening to http://localhost:${PORT}`)
})