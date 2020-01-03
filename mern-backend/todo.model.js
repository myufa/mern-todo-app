var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TodoSchema = new Schema({
    todo_description: {type: String},
    todo_responsible: {type: String},
    todo_priority: {type: String},
    todo_completed: {type: Boolean},
});


module.exports = mongoose.model("Todo", TodoSchema);