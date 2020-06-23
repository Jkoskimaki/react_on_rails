import React, { Component } from 'react';
import { Header, Container } from 'semantic-ui-react';
import TodoList from './components/todos/TodoList';
import TodoForm from './components/todos/TodoForm';
import axios from 'axios';

class App extends Component {
  state = { todos: [] }

  componentDidMount() {
    // TODO make call to our rails end to get all the todos
    axios.get("/api/todos")
      .then( res => {
        // put all todos in the state
        this.setState({ todos: res.data })
      })
      .catch( err => {
        console.log(err)
      })
  }
  addTodo = (todo) => {
    // Make a api call to the rails to add into the database
    axios.post('/api/todos', todo )
      .then( res => {
        const { todos } = this.state
        // update the state to add the new todo 
        this.setState({ todos: [...todos, res.data]})
      })
      .catch( err => {
        console.log(err)
      })
  }

  updateTodo = (id, todo) => {
    // make an api call to rails to update a todo with an id
    axios.post(`/api/todos/${id}`, todo)
      .then( res => {
        const todos = this.state.todos.map( t => {
          if ( t.id === id){
            return res.data
          }
          return t
        })
        this.setState({todos })
      })
      .catch( err => {
        console.log(err)
      })
    // update the state with the updated todo
  }

  deleteTodo = (id) => {
    // remove the todo from the database
    axios.delete(`/api/todos/${id}`)
    .then(res => {

      const {todos } = this.state
      this.setState({ todos: todos.filter( t=> t.id !== id )})

    })
    .catch(err => {
      console.log(err)
    })
    // remove the todo from the state
  }

  render() {
    const { todos } = this.state
    return(
      <Container>
        <Header>Todo List</Header>
        <TodoForm addTodo={this.addTodo}/>
        <TodoList todos={todos} updateTodo={this.updateTodo} />
      </Container>
    )
  }
}
export default App;