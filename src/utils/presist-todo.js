export function loadTodo() {
  console.warn('loadTodo')
  try {
    const raw = localStorage.getItem('lary-todo')
    return raw && JSON.parse(raw)
  } catch (error) {
    console.warn('无效 TODO 数据', error)
  }
}

export function saveTodo(todo) {
  console.warn('saveTodo')

  if (todo && typeof todo === 'object') {
    localStorage.setItem('lary-todo', JSON.stringify(todo))
  } else {
    console.warn('ignore todo')
  }
}
