const Account = require('../models/account');
const Note = require('../models/note');

const notes = {
    getNotes: (req, res) => {
        let accountID = req.cookies['client_id'];
        /* If the user is not logged in redirect to auth*/
        if( accountID === undefined){
            res.redirect('/notes/login');
        } else {
        /* If the user is logged in search for notes with their account_id in the db */
            Note.find({account: accountID}, (err, notes) => {
                if(err) throw err;
                if(notes[0] == null){
                    /* Render the view with no notes if none were found*/
                    res.render('notes'); 
                } else {
                    /* Render the view with the notes */
                    res.render('notes', {notes});
                }
            });
        }
    },
    addNote: (req, res) => {
        let accountID = req.cookies['client_id'];
        let newDate = new Date();

        if( accountID !== undefined){
            let newNote = new Note({
                name: '',
                text: '',
                color: 'ffffff',
                location: '',
                time: {
                    hours: newDate.getHours(),
                    mins: (newDate.getMinutes() < 10) ? '0' + newDate.getMinutes() : newDate.getMinutes(),
                    day: newDate.getDate(),
                    month: newDate.getMonth()+1,
                    year: newDate.getFullYear()
                },
                account: req.cookies['client_id']
            });
            
            note_id = newNote._id;
            newNote.save();
            console.log(newNote);
            res.redirect('/notes/edit?note='+note_id);
        } else{
            res.redirect('/notes/login');
        }
    },
    deleteNote: (req, res) => {
        let accountID = req.cookies['client_id'];
        Note.remove({_id: req.query.note,
        account: accountID}, (err, note) =>{
            res.send(note);
        });
    },
    editNote: (req, res) =>{
        let accountID = req.cookies['client_id'];
        if( accountID !== undefined){
            Note.findOne({ _id: req.query.note, account: accountID}, (err, note_params) => {
                if(!note_params){
                    console.log('no note for that id or the account is incorrect');
                    res.redirect('/notes');
                } else{
                    res.render('notes', {note_params});
                }
            });  
        } else {
            res.redirect('/notes/login');
        }
    },
    colorChange: (req, res) => {
        let accountID = req.cookies['client_id'];
        if( accountID !== undefined){
            Note.findOne({ _id: req.query.note}, (err, note) => {
                if(err) throw err;
                note.color = req.body.value;
                note.save();
                res.send(note);
            });
        } else {
            res.redirect('/notes/login');
        }
    },
    textChange: (req,res) => {
        let accountID = req.cookies['client_id'];
        if( accountID !== undefined){
            Note.findOne({ _id: req.query.note}, (err, note) => {
                if(err) throw err;
                note.text = req.body.value;
                note.save();
                res.send(note.text);
            });
        } else{
            res.redirect('/notes/login');
        }
    },
    locChange: (req,res) => {
        let accountID = req.cookies['client_id'];
        if( accountID !== undefined){
            Note.findOne({ _id: req.query.note}, (err, note) => {
                if(err) throw err;
                let value = req.body.value;
                note.location = value.charAt(0).toUpperCase() + value.slice(1);
                note.save();
                res.send(note.location);
            });
        } else{
            res.redirect('/notes/login');
        }
    },
    nameChange: (req, res) =>{
        let accountID = req.cookies['client_id'];
        if( accountID !== undefined){
            Note.findOne({ _id: req.query.note}, (err, note) => {
                if(err) throw err;
                note.name = req.body.value;
                note.save();
                res.send(note.name);
            });
        } else{
            res.redirect('/notes/login');
        }
    },
    pinNote: (req, res) =>{
        Note.findOne({_id: req.query.note,
        account: req.cookies['client_id']}, (err, note) =>{
            if(err) throw err;
            note.pin = true;
            note.save();
            res.send(note.pin);
        });
    },
    unpinNote: (req,res) =>{
        console.log(req.query.note);
        Note.findOne({ _id: req.query.note,
        account:req.cookies['client_id']}, (err, note) => {
            note.pin = false;
            note.save();
            res.send(note.pin);
        });
    }
}

module.exports = notes;