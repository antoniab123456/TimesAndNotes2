const Account = require('../models/account');
const Note = require('../models/note');


let auth = {
    getLoginPage: (req, res) => {
        /* Render the login form */
        res.render('notes_auth');
    },
    getRegPage: (req, res) => {
        res.render('notes_auth', {register_token: 'register_token'});
    },
    postLogin: (req, res) =>{
        let token = req.body.token;
        Account.findOne({token}, (err, existingAcc) =>{
            if(err) throw err;
            if(!existingAcc){
                /* Display error */
                console.log('The account was not found');
            } else { 
                res.cookie('client_id', existingAcc._id, {maxAge: 8640000});
                res.redirect('/notes');
            }
        });
    },
    postRegister: (req, res) => {
        let random = Math.random().toString(36).substring(2, 15);
        let reg_token = (random + random + random + random).toUpperCase();
        let newAccount = new Account({
                token: reg_token 
        });

        newAccount.save();
        res.send(reg_token);
    },
    Logout: (req, res) =>{
        res.clearCookie('client_id');
        res.redirect('/notes');
    }
}
module.exports = auth;

