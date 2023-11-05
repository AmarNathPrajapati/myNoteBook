const mongoose = require('mongoose');
const { Schema } = mongoose;

const NoteSchema = new Schema({
    // to recognize which user come
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    tag:{
        type:String,
        default:"General"
    },
    Date:{
        type:Date,
        default:Date.now
    }
});
const Note = mongoose.model('note',NoteSchema);
module.exports = Note;