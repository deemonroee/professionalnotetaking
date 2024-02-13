const express = require('express');
const path = require('path');
const routes = require('./routes/index');
const PORT = process.env.PORT || 3001;
const app = express();

// middleware for app to expect JSON syntax and data passing through URL
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// pathing for static files in public folder
app.use(express.static('public'));

// path for routes used in reading and writing notes
app.use('/api', routes);

// GET route for homepage
app.get('/', (req, res) => 
res.sendFile(path.join(__dirname, './public/index.html'))
);

// GET route for notes page
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.listen(PORT, () => 
console.log(`App now listening at http://localhost:${PORT}`)
)