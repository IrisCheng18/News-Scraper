const mongoose = require('mongoose');

// Save a reference to the Shema constructor
const Schema = mongoose.Schema;

//Using the Schema constructor, create a new NoteSchema object
const NoteShema = new Schema({
    title: String,
    body: String
});

const Note = mongoose.model('Note', NoteShema);

module.exports = Note;