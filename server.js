const express = require('express');
const path = require('path');
const {v4: uuidv4} = require('uuid');
const {readFromFile, appendToFile, deleteFromFile} = require('./helpers/notes.js')
// const api = require('./routes/index.js');

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

//Route to read db.json
app.get('/api/notes', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

//Route for appending new notes to db.json
app.post('/api/notes', (req,res) => {
  const { title, text } = req.body;
  if (title && text) {
  const newNote = {
    title,
    text,
    id: uuidv4(),
  };
  appendToFile(newNote, './db/db.json');
  res.json('Note have been added.')
} else {
  res.json('error when adding note');
}
});

// delete route attempt
app.delete('/api/notes/:id', (req,res) => {
 const { id } = req.params;
 if (id) {
 deleteFromFile(id, './db/db.json');
 res.json('Note have been deleted.')
 } else {
  res.json('error when deleting note');
 }
});

//all wildcard will be taken to index page
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () => {
    console.log(`App listening to http://localhost:${PORT}`)
});