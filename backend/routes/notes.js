const express = require('express');
const router = express.Router();
const Note = require('../models/Note')
const fecthuser = require('../middleware/fetchuser');
// to validate user's notes
const { body, validationResult } = require('express-validator');

// Routes:1 router for fetch all notes using GET request

router.get('/fetchallnotes',fecthuser,async (req,res)=>{
    // getting notes of loggedin user
    try {
        const notes = await Note.find({user:req.user.id});
        res.json([notes]);       
    }catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured : internal serever");
}
})
// Routes:2 for save notes using POST request addnotes 

router.post('/addnotes',fecthuser,[
    body('title','Enter a  valid title').isLength({ min: 3 }),
    body('description','description should be minimum 5 Character').isLength({ min: 5 })
],async (req,res)=>{
    try {
    const {title, description,tag} = req.body;
     // return bad request if there are error
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() });
     }

     //adding new  notes
     const note = new Note({
         title,description,tag,user : req.user.id,
     })
    const saveNotes=await note.save();
    
    res.json([saveNotes]);
       
} catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured : internal serever");
}
})
// Routes:3 update an existing notes using PUT request on the "api/notes/updatenotes"

router.put('/updatenotes/:id',fecthuser,async (req,res)=>{
try {
    // bringing components using destructure
    const {title, description,tag} = req.body;
    //create new note object
    const newnote = {};
    if(title){
        newnote.title = title;
    }
    if(description){
        newnote.description = description;
    }
    if(tag){
        newnote.tag = tag;
    }
    //find the note to be updated
    let note =await Note.findById(req.params.id);
    if(!note){
        return res.status(404).send("NOT FOUND");
    }
    //check user access own notes or not
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("NOT ALLOWED");
    }
    // if everything is ok
    note = await Note.findByIdAndUpdate(req.params.id,{$set:newnote},{new:true});
    res.json(note);
        
} catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured : internal serever");
}
})
// Routes:4 delete an existing notes using DELETE request on the "api/notes/updatenotes"

router.delete('/deletenotes/:id',fecthuser,async (req,res)=>{
    try {
        
    // bringing components using destructure
    const {title, description,tag} = req.body;
    //find the note to be updated
    let note =await Note.findById(req.params.id);
    if(!note){
        return res.status(404).send("NOT FOUND");
    }
    //check user access own notes or not
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("NOT ALLOWED");
    }
    // if everything is ok
    note = await Note.findByIdAndDelete(req.params.id);
    res.json({"Success":" Note has been deleted",note:note});
}catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured : internal serever");
}
})
module.exports = router;