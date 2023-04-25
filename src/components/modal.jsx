

const Modal = ({editingTodo, setEditingTodo, setShowModal, handleSaveEdit}) => {
  return (
    <div>
        <div className="modal-wrapper">
  <div className="edit-modal">
    <h4>Yeni Değer Giriniz..</h4>
    <input type="text" className="input" 
    value={editingTodo.title} 
    onChange={(e)=>setEditingTodo({...editingTodo,
     title: e.target.value,
     date: new Date().toLocaleString(),
     })} />
    <button className="btn btn-danger"onClick={() => setShowModal(false)}>Sil</button>
    <button className="btn btn-info" onClick={handleSaveEdit}>Kaydet</button>

  </div>
        </div> 
    </div>
  )
}

export default Modal
