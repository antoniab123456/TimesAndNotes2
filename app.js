let express = require('express');
    path = require('path'),
    exphbs = require('express-handlebars'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    mongoose = require('mongoose');

/* Basic server setup */
let app = express();

let port = process.env.PORT || 9012;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});


/* BodyParser Middleware */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


/* moongoose middleware */
mongoose.connect('mongodb://localhost:27017/times_notes',{ useNewUrlParser: true });
mongoose.set('debug', true);


/* View Engine */
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');


/* Static folder setup */
app.use('/notes', express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public'));


/* Setup routes */

const notes = require('./router/notes');
const router = require('./router/index');


app.use('/notes', notes);
app.use('/', router);


app.use((req, res, next) =>{
    res.locals.account = req.account || null;
});


