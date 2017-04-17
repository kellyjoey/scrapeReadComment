// Require mongoose
var mongoose = require("mongoose");
// Create a schema class
var Schema = mongoose.Schema;

// Create the Note schema
var SavedSchema = new Schema({
 // title is a required string
  title: {
    type: String,
    required: true
  },
  // link is a required string
  link: {
    type: String,
    required: true
  },
  // This only saves one note's ObjectId, ref refers to the Note model
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
});

// Remember, Mongoose will automatically save the ObjectIds of the notes


// Create the Note model with the NoteSchema
var Saved = mongoose.model("Saved", SavedSchema);

// Export the Note model
module.exports = Saved;