
// props yerine todo,handleDelete, handleDone yazabiliriz.
const Todo = ({todo, handleDelete, handleDone, setShowModal, setEditingTodo}) => {
  return (
    
<div className=" shadow border d-flex justify-content-between my-1 p-3 rounded bg-secondary">
           <div className="d-flex flex-column gap-2 " >
            <h5 style={{ textDecorationLine: todo.isDone ? "underline" : ''}} >{todo.title}  </h5>
         
            <p>{todo.date}</p>
           </div>
           <div className=" btn ">
      <button className="btn btn-dark m-1 px-2 " onClick={()=>{handleDelete(todo)}} >Sil</button>

      <button className="btn btn-dark m-1 px-3 " 
      onClick={()=> 
       { setShowModal(true);
        setEditingTodo(todo)}
      }
       >Güncelle</button>
      <button className="btn btn-dark m-1 px-3  "onClick={()=>{handleDone(todo)}}
       > {todo.isDone ? "Yapıldı" : "Yapılacak"} </button>
           </div>
           </div>
          
 
  )}

export default Todo;