import { useState, useEffect } from 'react'
import Navbar from './Components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
// ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

function App() {
  const [Todo, setTodo] = useState('')
  const [Todos, setTodos] = useState([])
  const [Showfinished, setShowfinished] = useState(true)  

  useEffect(() => {
    let todoString = localStorage.getItem("Todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("Todos"));
      setTodos(todos)
    }
  }, [])
  

  const saveToLS = () => {
    localStorage.setItem("Todos", JSON.stringify(Todos))
  }
  
    const ToggleFinished = (e) => {
      setShowfinished(!Showfinished)
    }
    

  const handleEdit = (e, id) => {
    let t = Todos.filter(i=>i.id === id)
    setTodo(t[0].Todo)

    let newtodos = Todos.filter(item=>{
      return item.id !== id 
    });
    setTodos(newtodos)
    saveToLS();
  }
  const handleDelete = (e, id) => {
    let newtodos = Todos.filter(item=>{
      return item.id !== id 
    });
    setTodos(newtodos)
    saveToLS();
  }
  const handleAdd = () => {
    setTodos([...Todos, { id: uuidv4(), Todo, isCompleted: false }])
    setTodo('')
   
    saveToLS();
  }
  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = Todos.findIndex(item => {
      return item.id === id;
    })
    let newtodos = [...Todos];
    newtodos[index].isCompleted = !newtodos[index].isCompleted
    setTodos(newtodos)
    saveToLS();
  }


  return (
    <>
      <Navbar />
      <div className="md:container mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-1/2">
      <h1 className='font-bold text-center text-xl md:text-2xl'>iTask - Manage your todos at one place</h1>
        <div className="addtodo my-5 flex flex-col gap-5">
          <h2 className='text-lg font-bold my-5'>Add a Todo</h2>
          <input onChange={handleChange} value={Todo} type="text" className='w-full rounded-full px-5 py-1' />
          <button onClick={handleAdd} disabled={Todo.length<=3} type="submit" className='bg-violet-500 disabled:bg-violet-700 hover:bg-violet-800 p-3 py-1 text-sm font-bold text-white rounded-lg mx-6'>Save</button>
        </div>
        <input type="checkbox" onChange={ToggleFinished} checked={Showfinished} name="" id="" /> Show finished
        <h2 className='text-xl font-bold'>Your Todos</h2>
        <div className="todos">
          {Todos.length === 0 && <div className='m-5'>No Todos to display</div> }
          {Todos.map(item => {

            return (Showfinished || !item.isCompleted) &&  <div key={item.id} className="todo flex my-3 justify-between">
              <div className='flex gap-5'>
              <input onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} name={item.id} id="" />
              <div className={item.isCompleted ? "line-through" : ""}>{item.Todo}</div>
              </div>
              <div className="buttons">
                <button onClick={(e)=>handleEdit(e, item.id)} className='bg-violet-500 hover:bg-violet-800 p-3 py-1 text-sm font-bold text-white rounded-lg mx-1'><FaEdit /></button>
                <button onClick={(e)=>{handleDelete(e, item.id)}} className='bg-violet-500 hover:bg-violet-800 p-3 py-1 text-sm font-bold text-white rounded-lg mx-1'><MdDelete /></button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
