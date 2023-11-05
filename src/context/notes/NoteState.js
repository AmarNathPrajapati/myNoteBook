import { useState } from "react";
import NoteContext from "./NoteContext";
const NoteState  = (props) =>{
    const host = "http://localhost:5000"
    const noteInitial = [];
    const [notes,setNotes] = useState(noteInitial);
    // add a notes 
          const addNote = async (title,description,tag,id) =>{
            //api call
            const response = await fetch(`${host}/api/notes/addnotes`,{
              method:"POST",
              headers:{
                'Content-type':'application/json',
                'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFlYjkwYjI5ZGZhMmUwOGRkZjdmZTI5In0sImlhdCI6MTY0Mjg3OTk3Mn0.olJwCC3oko8p8sJTCvUbf8R_p4cdPQkj0QY2oXgMtMc'
              },
              body:JSON.stringify({title,description,tag})
            })
            let note ={
              "_id": "61ecdbc95c4a97c11e86965a63",
              "user": "61eb90b29dfa2e08ddf7fe29",
              "title": title,
              "description": description,
              "tag": tag,
              "Date": "2022-01-23T04:38:33.605Z",
              "__v": 0
            };
            setNotes(notes.concat(note));
          }
    // get all notes 
          const getNote = async () =>{
            //api call
            const response = await fetch(`${host}/api/notes/fetchallnotes`,{
              method:"GET",
              headers:{
                'Content-type':'application/json',
                'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFlYjkwYjI5ZGZhMmUwOGRkZjdmZTI5In0sImlhdCI6MTY0Mjg3OTk3Mn0.olJwCC3oko8p8sJTCvUbf8R_p4cdPQkj0QY2oXgMtMc'
              }
            });
            const json = await response.json();
            console.log(json);
            setNotes(json[0]);
          }
    // delete a notes
          const deleteNote = async (id)=>{
            //api call
            const response = await fetch(`${host}/api/notes/deletenotes/${id}`,{
              method:"DELETE",
              headers:{
                'Content-type':'application/json',
                'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFlYjkwYjI5ZGZhMmUwOGRkZjdmZTI5In0sImlhdCI6MTY0Mjg3OTk3Mn0.olJwCC3oko8p8sJTCvUbf8R_p4cdPQkj0QY2oXgMtMc'
              }
            });
            const json = await response.json();
            console.log(json);
            setNotes(json[0]);
            const newNotes = notes.filter((note)=>{return note._id!==id});
            setNotes(newNotes);
          }
    // edit a notes
          const editNote =async (id,title,description,tag) =>{
            //api call
            const reponse = await fetch(`${host}/api/notes/updatenotes/${id}`,{
              method:"POST",
              headers:{
                'Content-type':'application/json',
                'auth-token':'',
              },
              body:JSON.stringify({title,description,tag})
            })
           // const json = response.json
            for (let index = 0; index < notes.length; index++) {
              const element = notes[index];
              if(element._id===id){
                element.tag = tag;
                element.description = description;
                element.title = title;
              }
            }
          }
    return(
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;