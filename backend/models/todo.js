// todo.js - Backend/models 
// Tehdään Schema-moduuli Todo-tehtävää varten. 
// Kuvaus, kuka hoitaa tehtävän, priorisointi
// ja tehvän suoritus-merkintä.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Todo = new Schema({
    todo_description: {
        type: String
    },
    todo_responsible: {
        type: String
    },
    todo_priority: {
        type: String
    },
    todo_completed: {
        type: Boolean
    }
});

module.exports = mongoose.model('Todo', Todo);