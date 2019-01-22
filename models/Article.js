const mongoose = require('mongoose');

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
const ArticleSchema = new Schema({
    // The title of the article
    headline: {
        type: String,
        unique: true,
        required: true
    },
    // A short summary of the article
    summary:{
        type: String,
        required: true
    },
    // The url to the original article
    url: {
        type: String,
        required: true
    },
    saved: {
        type: Boolean,
        default: false
    },
    // 'note' is an object that stores a Note id
    // The ref property links the ObjectId to the Note model
    // This allows us to populate the Article with an associated Note
    note: {
        type: Schema.Types.ObjectId,
        ref: 'Note'
    }
});

// This creates our model from the above schema, using mongoose'd model method
const Article = mongoose.model('Article', ArticleSchema);

// Export the Article model
module.exports = Article;