import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';

// const { v4: uuidv4 } = require('uuid');

function App() {

  const[todo,setTodo] = useState("");
  const[todos,setTodos] = useState([]);

  useEffect(() => {
    let todoString = localStorage.getItem("todos")

    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])

  const saveLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const handleAdd = () => {
    setTodos([...todos, {id: uuidv4(), todo, isCompleted: false}])
    setTodo("")
    saveLS()
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleEdit = (e, id) => {
    let t = todos.filter(item => item.id === id)
    setTodo(t[0].todo)

    let newTodos = todos.filter(item => {
      return item.id!==id
    })

    setTodos(newTodos)
    saveLS()
  }

  const handleDelete = (e, id) => {
    var del=confirm("Are you sure you want to delete this record?");
    if(del){
      let newTodos = todos.filter(item => {
        return item.id!==id
      })

      setTodos(newTodos)
      saveLS()
    }
  }

  const handleCheckbox = (e) => {
    let id = e.target.name

    let index = todos.findIndex(item => {
      return item.id === id;
    })

    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveLS()
  }

  return (
    <>
    <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-1/2">
      <h1 className='font-bold text-center text-3xl'>TODO App Manger</h1>
        <div className="add-todo my-5 flex flex-col gap-5">
          <h2 className="text-2xl font-bold">Add your TO-DO</h2>
          <div className="flex">
            <input onChange={handleChange} value={todo} type="text" className='w-full rounded-full px-5 py-1' />
            <button onClick={handleAdd} className='bg-violet-400 hover:bg-violet-800 font-bold text-sm text-white mx-2 p-4 py-2 rounded-full' disabled={todo.length < 5}>Save</button>
          </div>
        </div>
        <h2 className="text-2xl font-bold">Your TO-DO List</h2>  
        <div className="todo-list">
          {todos.length ===0 && <div className='m-5'>There is no TODOs.</div>}
          {todos.map(item=>{
          return <div key={item.id} className="todo flex my-3 justify-between">
            <div className="flex gap-5">
              <input name={item.id} onChange={handleCheckbox} checked={item.isCompleted} type="checkbox" id="" />
              <div className={item.isCompleted?"line-through":""}>{item.todo}</div>  
            </div>
            <div className="buttons flex h-full">
              <button onClick={(e) => {handleEdit(e, item.id)}} className='bg-green-600 hover:bg-lime-300 font-bold text-sm text-white mx-1 p-2 py-1 rounded-md'>Edit</button>
              <button onClick={(e) => {handleDelete(e, item.id)}} className='bg-red-600 hover:bg-red-200 font-bold text-sm text-white mx-1 p-2 py-1 rounded-md'>Delete</button>
            </div>
          </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
