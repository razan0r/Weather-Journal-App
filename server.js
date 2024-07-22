const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

const port = 8000;
const server = app.listen(port, () => {
  console.log(`Server running on localhost: ${port}`);
});

let projectData = {};

app.get('/all', (req, res) => {
  res.send(projectData);
});

app.post('/add', (req, res) => {
  projectData = req.body;
  res.send(projectData);
});
