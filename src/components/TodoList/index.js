import React from 'react'
import Todo from './Todo'
import style from './todo.module.css'
import Priorities from './Priority'

function TodoList() {
  //const [todos, setTodos] = React.useState([])
  //const [title, setTitle] = React.useState('')
  //const [desc, setDesc] = React.useState('')
  //const [priority, setPriority] = React.useState('normal')

  const initialState = {
    todos: [],
    title: '',
    desc:'',
    priority:'normal'
  }


  const reducer = (state, action) => {
    switch (action.type) {
      case 'ADD_TITLE':
        return {
          ...state, 
          title: action.title
        };
      case 'ADD_DESC':
        return {
          ...state, 
          desc: action.desc
        };
      case 'ADD_PRIORITY':
        return {
          ...state, 
          priority: action.priority
        };
      case 'ADD_TODO':
        return {
          ...state, 
          todos: [...state.todos, action.newTodos]
        };
      case 'CLEAR_FIELDS':
        return {
          ...state, 
          title: '',
          desc: '',
          priority: 'normal'
        };
      default:
        throw new Error();
    }
  }

  const [state, dispatch] = React.useReducer(reducer, initialState)
  const {todos, title, desc, priority} = state

  const handleAdd = (e) => {
    e.preventDefault()
    const newTodos = {
      title, desc, priority
    }
    dispatch({type: 'ADD_TITLE', title: e.target.value })
    dispatch({type: 'ADD_DESC', desc: e.target.value })
    dispatch({type: 'ADD_PRIORITY', priority: priority})
    dispatch({type:'ADD_TODO', newTodos: newTodos })
    dispatch({type:'CLEAR_FIELDS'})
  }

  return (
    <div className={style.page}>
      <form className={style.form}>
        <h3>Новая задача</h3>
        <input 
          type="text" 
          placeholder="Название" 
          value={title}
          onChange={(e) => dispatch({ type: 'ADD_TITLE', title: e.target.value })}
        />
        <textarea 
          placeholder="Описание" 
          value={desc}
          onChange={(e) => dispatch({ type: 'ADD_DESC', desc: e.target.value })}
        />
        <Priorities 
          priority={priority}
          setPriority={(radio) => dispatch({type: 'ADD_PRIORITY', priority: radio})}
        />
        <button onClick={handleAdd} >
          Добавить
        </button>
      </form>
      <div className={style.list}>
      { todos.map((c, index) => <Todo key={index} todo={c}/>) }
      </div>
    </div>
  )
}

export default TodoList
