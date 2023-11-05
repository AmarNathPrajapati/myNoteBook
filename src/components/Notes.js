import React, { useContext, useEffect, useRef,useState } from "react";
import NoteContext from "../context/notes/NoteContext";
import NoteItems from "./NoteItems";
import AddNote from "./AddNote";

const Notes = () => {
  const context = useContext(NoteContext);
  const { notes, getNote } = context;
  useEffect(() => {
    getNote();
  }, []);
  const [note, setNote] = useState({etitle:"",edescription:"",etag:""});
  const handleClick = (e) =>{
        e.preventDefault();
  }
  const onchange =(e)=>{
      setNote({...note,[e.target.name]:e.target.value})
  }
  const editNote = (currentNote) => {
    ref.current.click();
    setNote({etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag});
  };
  const ref = useRef(null);
  return (
    <div className="row my-3">
      <AddNote />
      <button
        type="button"
        class="btn btn-primary d-none"
        data-bs-toggle="modal"
        ref={ref}
        data-bs-target="#exampleModal"
      ></button>
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form>
                <div className="mb-3 my-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    title
                  </label>
                  <input
                    value={note.etitle}
                    id="etitle"
                    name="etitle"
                    onChange={onchange}
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                  />
                  <div id="emailHelp" className="form-text"></div>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Description
                  </label>
                  <input
                    value={note.edescription}
                    id="edescription"
                    name="edescription"
                    onChange={onchange}
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
                    value={note.etag}
                    id="etag"
                    name="etag"
                    onChange={onchange}
                    type="text"
                    className="form-control"
                    id="exampleInputPassword1"
                  />
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button onClick={handleClick} type="button" class="btn btn-primary">
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <h2>Your Notes Here</h2>
      {notes.map((notes) => {
        return <NoteItems editNote={editNote} notes={notes} />;
      })}
    </div>
  );
};

export default Notes;
