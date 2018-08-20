const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NewAccount = new Schema({
    token:  String,
    notes: [{
        type: Schema.Types.ObjectId,
        ref: 'Note' 
    }]
});

module.exports = mongoose.model('Account', NewAccount);