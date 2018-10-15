import React, { Component } from 'react'
import './App.css'
import * as utils from './utils/presist-todo'

const tipText = "What's the next?"

class TodoList extends Component {
  render() {
    return (
      <ul className="todo-list">
        {this.props.items.map(item => (
          <li key={item.id}>
            <span className="content">
              <h5 className="title">{item.text}</h5>
              {item.description && <p>{item.description}</p>}
            </span>
            <span className="actions">
              <i
                className="delete"
                onClick={this.props.delete.bind(null, item.id)}
              >
                x
              </i>
            </span>
          </li>
        ))}
      </ul>
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
      text: ''
    }
    ;['handleChange', 'handleSubmit', 'handleDelete'].forEach(m => {
      this[m] = this[m].bind(this)
    })
  }

  handleChange(e) {
    this.setState({ text: e.target.value })
  }
  handleSubmit(e) {
    e.preventDefault()
    if (!this.state.text.length) {
      return
    }
    const newItem = {
      text: this.state.text,
      id: +new Date()
    }
    this.setState(state => ({
      items: state.items.concat(newItem),
      text: ''
    }))
  }
  handleDelete(id) {
    const toDelete = this.state.items.find(item => item.id === id)
    const text = toDelete ? toDelete.text : this.state.text
    this.setState(state => ({
      items: state.items.filter(item => item.id !== id),
      text
    }))
  }
  componentWillMount() {
    const todo = utils.loadTodo()
    if (todo) {
      this.setState({ ...this.state, ...todo })
    }
  }
  componentDidUpdate() {
    const todo = { items: this.state.items, text: this.state.text }
    utils.saveTodo(todo)
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Lary's <code>Dashboard</code> React.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <main>
          <div className="lary-todo">
            <h3>TODO</h3>
            <TodoList items={this.state.items} delete={this.handleDelete} />
            <form onSubmit={this.handleSubmit}>
              {this.state.text && (
                <label className="tip-text" htmlFor="new-todo">
                  {tipText}
                </label>
              )}
              <input
                id="new-todo"
                onChange={this.handleChange}
                value={this.state.text}
                placeholder={tipText}
              />
              <button>Add #{this.state.items.length + 1}</button>
            </form>
          </div>
        </main>
      </div>
    )
  }
}

export default App
