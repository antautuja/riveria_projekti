// server.js - Backend
// Asennetaan ja otetaan käyttöön Express, Body-parser, Cors ja Mongoose.
// Luodaan ns. Express-palvelin, joka kuuntelee porttia 4000.
// Backend-puolen Mongo-tietokantametodit Todo-tetäville 


const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const todoRoutes = express.Router();
const PORT = 4000;

const Todo = require('./models/todo');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/todos', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function () {
    console.log("MongoDB-tietokantayhteys muodostettu onnistuneesti");
})

todoRoutes.route('/').get(function (req, res) {
    Todo.find(function (err, todos) {
        if (err) {
            console.log(err);
        } else {
            res.json(todos);
        }
    });
});

todoRoutes.route('/:id').get(function (req, res) {
    let id = req.params.id;
    Todo.findById(id, function (err, todo) {
        res.json(todo);
    });
});

todoRoutes.route('/update/:id').post(function (req, res) {
    Todo.findById(req.params.id, function (err, todo) {
        if (!todo)
            res.status(404).send("Tietoa ei löydy.");
        else
            todo.todo_description = req.body.todo_description;
        todo.todo_responsible = req.body.todo_responsible;
        todo.todo_priority = req.body.todo_priority;
        todo.todo_completed = req.body.todo_completed;

        todo.save().then(todo => {
            res.json('Tehtävä päivitetty!');
        })
            .catch(err => {
                res.status(400).send("Päivitys ei onnistunut.");
            });
    });
});

todoRoutes.route('/add').post(function (req, res) {
    let todo = new Todo(req.body);
    todo.save()
        .then(todo => {
            res.status(200).json({ 'todo': 'Tehtävä lisätty onnistuneesti.' });
        })
        .catch(err => {
            res.status(400).send('Tehtävän lisääminen epäonnistui.');
        });
});

app.use('/todos', todoRoutes);

app.listen(PORT, function () {
    console.log("Palvelin kuuntelee porttia: " + PORT);
});