var express = require("express"); var app = express();
var mongoose = require("mongoose");
var body_parser = require("body-parser");
var cors = require("cors");

var todoRoutes = express.Router();
var Todo = require("./todo.model");

app.use(cors());
app.use(body_parser.json());


dbUrl = "mongodb+srv://myufa:Michael14@cluster0-khbyk.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true});
var connection = mongoose.connection;

connection.once('open', ()=>{
    console.log("MongoDB Connected");
});


todoRoutes.get('/', (req,res,next)=>{
    Todo.find((err,todos)=>{
        if(err) {console.log(err);}
        else {res.json(todos)}
    });
});

todoRoutes.get('/:id', (req,res,next)=>{
    let id = req.params.id;
    Todo.findById(id, (err, todo)=>{
        res.json(todo);
    });
});

todoRoutes.post('/add', (req,res,next)=>{
    let todo = new Todo(req.body);
    todo.save()
    .then(todo => {
        console.log(req.body)
        res.status(200).json({'todo': 'todo added succesfully'});
    })
    .catch(err => {
        res.status(400).json({'error': 'adding todo failed'});
    });
});

todoRoutes.post('/update/:id', (req,res,next)=>{
    Todo.findById(req.params.id, (err, todo)=>{
        console.log(req.params.id);
        if(!todo){
            res.status(404).send("Data not found");
        }
        else{
            todo.todo_description = req.body.todo_description;
            todo.todo_responsible = req.body.todo_responsible;
            todo.todo_priority = req.body.todo_priority;
            todo.todo_completed = req.body.todo_completed;

            todo.save()
            .then(todo => {
                res.json("todo updated!")
            })
            .catch(err =>{
                res.status(400).send("error: update not possible")
            });
        }
    });
});


app.use("/todos", todoRoutes);

var port = 4000;

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
});