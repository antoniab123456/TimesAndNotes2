let express = require('express'),
    router = express.Router(),
    notes = require('../controllers/notes_controller');
    auth = require('../controllers/auth_controller');

/* Get Requests */    
router.get('/', notes.getNotes);
router.get('/login', auth.getLoginPage);
router.get('/register', auth.getRegPage);
router.get('/edit', notes.editNote);
router.get('/logout', auth.Logout);

/* Post Requests */
router.post('/login', auth.postLogin);
router.post('/register', auth.postRegister);
router.post('/add', notes.addNote);
router.post('/delete', notes.deleteNote);
router.post('/pin', notes.pinNote);
router.post('/unpin', notes.unpinNote);


/* Put requests*/
router.put('/color/', notes.colorChange);
router.put('/text/', notes.textChange);
router.put('/location/', notes.locChange);
router.put('/name/', notes.nameChange);

module.exports = router;
