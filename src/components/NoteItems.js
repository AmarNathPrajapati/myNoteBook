import React, { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";
const NoteItems = (props) => {
  const { notes,editNote } = props;
  const context = useContext(NoteContext);
  const { deleteNote } = context;
  return (
      <div className="col-md-3">
        <div className="card my-3">
          <div className="card-body">
            <h5 className="card-title">{notes.title}</h5>
              <p className="card-text"> {notes.description}</p>
              <i className="fas fa-trash mx-3" onClick={()=>(deleteNote(notes._id))}  ></i>
            <i className="fas fa-edit mx-3" onClick={()=>{editNote(notes)}}></i> 
          </div>
        </div>
      </div>
  );
};

export default NoteItems;
