const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    name: String,
    text:  String,
    color: String,
    location:  String,
    time: {
        hours: String,
        mins: String,
        day: String,
        month: String,
        year: String
    },
    id: String,
    account: {
        type: Schema.Types.ObjectId,
        ref: 'Account'
    },
    pin: Boolean
});

module.exports = mongoose.model('Note', NoteSchema);
