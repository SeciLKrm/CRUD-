import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Todo from "./components/todo";
import Modal from "./components/modal";

function App() {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState('');
  const [showModal, setShowModal] =useState(false);
  const [editingTodo, setEditingTodo] = useState({})


const handleSubmit= (e) =>{
  e.preventDefault()
  if(!todoText){
    toast.warn('Formu Dodurunuz', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  }
  

 // todo için gerekli bilgleri içeren obje ouşturma
const newTodo ={
 
  id: new Date().getTime(),
  title: todoText,  
  date: new Date().toLocaleString(),
  isDone: false,
};

 // oluşturulan todo objesini todolar stateine aktarma
// spread opertorle önceden eklenenleri muhafaza et
setTodos([...todos, newTodo]);


// eleman eklenince formu sıfırlama
setTodoText('')
console.log(todos)
}


  // silme butonuna tıklandığında çalışır
  // todo dizisini gezer ve id si silinecek todonun idsine eşit olmayanları döndürür
const handleDelete =(deletedTodo)=>{
const filtered = todos.filter ((item)=> item.id !== deletedTodo.id)
setTodos(filtered)

toast.error('To do Kaldırıldı ', {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
  });
}


// yapıldı butonuna tıklanıldığında çaılşır
  // 1 - düzenlenecek todonun dizideki sırasını bulma
  // 2 - düzenlenicek todonun isDone değerini tersine çevirme
  // 3 - todoyu diziden çıkarıp yerine düzenlenmiş halini koyma
  // 4 - todolar dizisinin bir kopyasını oluşturup onu güncelle
  //  5 - güncelellenen kopyayı todoloların yeni değeri olarak tanımla
const handleDone =(todo)=>{
 const index = todos.findIndex((item)=> item.id === todo.id);

 const newValue = !todos[index].isDone
 const changedTodo = {...todos, isDone: newValue }
 const newTodos = [...todos]
 newTodos.splice(index, 1, changedTodo)
 setTodos(newTodos)
 
}
const handleSaveEdit =()=>{

if(!editingTodo.title){
  toast.error('To do boş bırakılamaz ', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });
    return
}


   // splice için değişecek elemanın dizideki yerini bulma(indexi)
  let index = todos.findIndex((item)=> item.id === editingTodo.id)

    // direkt olarak statei değiştirmek yerine todo dizisinin bir kopyasını oluştur
  const cloneTodos = [...todos]

// diziden güncellenecek todoyu çıkarıp yerine düzenlenmiş todoyu ekle
  cloneTodos.splice(index,1,editingTodo)
  // ekrana bastığımız diziyi güncelle
  setTodos(cloneTodos)
 // kaydedildikten sora modalı kapatma
  setShowModal(false)

   // ekrana bildirim gönderme
toast.success('To do başarıyla güncellendi ', {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
  });
};


  return (
    <div>
      <ToastContainer />
      <h1 className="bg-dark">CRUD</h1>
      <br/><br/>
      <div className="container border rounded p-5  ">
       <form onSubmit={handleSubmit}   className="d-flex gap-3">
        <input type="text" className="form-control" placeholder="Yeni Yapılacak Ekle.."
         value= {todoText}
         onChange={(e)=>{setTodoText(e.target.value)
       }}/>   
        
      <button className="btn btn-success w-25 ">Ekle </button>

       </form>

       <div className="d-flex flex-column mt-4">

        {
       todos.length === 0 && (
        <div className="text-center text-light"> <h5 >Yapılacak birşey yok  :( </h5>
        </div>
       )
        }
         {
          todos.map((todo)=>(
           <Todo
           key={todo.id}
           todo={todo}
           handleDelete ={handleDelete}
           handleDone ={handleDone}
           setShowModal ={setShowModal}
           setEditingTodo ={setEditingTodo}
           />
          ))
         }
       </div>
 
      </div>
      {showModal && (
       <Modal
       setEditingTodo={setEditingTodo}
       editingTodo={ editingTodo}
       setShowModal={setShowModal}
       handleSaveEdit={handleSaveEdit}
      />
      )
      }
    
    </div>
  );
}
export default App;
