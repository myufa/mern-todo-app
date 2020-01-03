import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Todo = props => (
    <tr>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_description}</td>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_responsible}</td>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_priority}</td>
        <td>
            <Link to = {"/edit/" + props.todo._id}>Edit</Link>
        </td>
    </tr>
);

export default class TodoList extends Component{
    constructor(props){
        super(props);
        this.state = {todos: []};
    }

    updateStateHandler = () => { 
        axios.get('http://localhost:4000/todos/')
           .then(res => {
                this.setState({ todos: res.data });
           })
           .catch(function(err){
               console.log(err);
          })
     }

    componentDidMount() {
        axios.get("http://localhost:4000/todos/")
            .then(response => {
                this.setState({todos: response.data});
            })
            .catch((error)=>{
                console.log(error);
            });
    }

    todoList(){
        console.log(this.state);
        return this.state.todos.map((currentTodo, i)=>{
            return <Todo todo={currentTodo} updateState={this.updateStateHandler} key={i} />;
        });
    }

    render(){
        return(
            <div>
                <h3>Todos List</h3>
                <table className="table table-striped" style={{marginTop: 20}}>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Responsible</th>
                            <th>Priority</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.todoList()}
                    </tbody>

                </table>
            </div>
        );
    }
};