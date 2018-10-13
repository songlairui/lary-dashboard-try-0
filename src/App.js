import React, { Component } from 'react'
import './App.css'

class TodoList extends Component {
  render() {
    return (
      <ul>
        {this.props.items.map(item => (
          <li key={item.id}>{item.text}</li>
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
    ;['handleChange', 'handleSubmit'].forEach(m => {
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
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Edit <code>src/App.js</code> and save to reload.
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
            <TodoList items={this.state.items} />
            <form onSubmit={this.handleSubmit}>
              <label htmlFor="new-todo">next to be done</label>
              <input
                id="new-todo"
                onChange={this.handleChange}
                value={this.state.text}
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
