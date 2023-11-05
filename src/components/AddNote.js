import React, { useContext , useState} from "react";
import NoteContext from "../context/notes/NoteContext";
const AddNote = () => {
  const context = useContext(NoteContext);
  const { addNote } = context;
  const [note, setNote] = useState({title:"",description:"",tag:""});
  const handleClick = (e) =>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
  }
  const onchange =(e)=>{
      setNote({...note,[e.target.name]:e.target.value})
  }
  return (
    <div className="container my-3">
      <h2>Add a Notes</h2>
      <form>
        <div className="mb-3 my-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            title
          </label>
          <input id="title" name="title" onChange={onchange}
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Description
          </label>
          <input
            id = "description" name ="description"  onChange={onchange}
            type="text"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            tag
          </label>
          <input
            id = "tag" name ="tag"  onChange={onchange}
            type="text"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <button type="submit" onClick={handleClick} className="btn btn-primary">
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
