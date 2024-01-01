const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://admin:Vikyath%401964@cluster0.owmhwku.mongodb.net/Todo')

const todoSchema = mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean,
})

const Todos = mongoose.model('todos',todoSchema);
module.exports = {
    Todos
}