import { useEffect, useState } from "react"
import Formulario from "./Formulario"
import Todo from "./Todo";

const TodoList = () => {

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("todos")) {
      setTodos(JSON.parse(localStorage.getItem("todos")));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const agregarTodo = (todo) => {
    setTodos((old) => [...old, todo]);
  }

  const eliminarTodo = (id) => {
    setTodos((old) => old.filter((todo) => todo.id !== id));
  }

  const cambiarEstadoTodo = (id) => {
    
    const tmpTodos = todos.map((todo) => (
      todo.id === id ? { ...todo, estado: !todo.estado } : todo
    ));
    setTodos(tmpTodos);
  }

  return (
    <>
      <Formulario agregarTodo={agregarTodo}/>
      <ul className="list-group list-group-numbered mt-2">
        {
          todos.map((todo) => (
            <Todo 
              key={todo.id} 
              todo={todo} 
              eliminarTodo={eliminarTodo}
              cambiarEstadoTodo={cambiarEstadoTodo}
            />
          ))
        }
      </ul>
    </>
  )
}

export default TodoList
