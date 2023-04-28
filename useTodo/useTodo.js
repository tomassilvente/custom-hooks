import { useReducer, useEffect } from "react"
import {todoReducer} from "./todoReducer"

const init = () =>{
    return JSON.parse(localStorage.getItem('todos') ) || []
}  

export const useTodo = () =>{
    
    const [todos, dispatch] = useReducer( todoReducer , [] , init )

    useEffect(() => {
      localStorage.setItem('todos', JSON.stringify( todos ))
    }, [todos])
    

    const handleNewTodo = (todo) =>{
         const action ={
             type: '[TODO] Add todo',
             payload: todo
         }
         dispatch(action)
    }

    const handleDeleteTodo = (id) =>{
        dispatch({
            type: '[TODO] Remove todo',
            payload: id
        })
    }

    const handleToggleTodo = (id) =>{
        dispatch({
            type: '[TODO] Toggle todo',
            payload: id
        })
    }

    let todosCount = todos.length
    let pendingTodosCount = todos.filter(todo => !todo.done).length

    return{
        todos,
        todosCount,
        pendingTodosCount,
        handleDeleteTodo,
        handleNewTodo,
        handleToggleTodo,
        
    }
}