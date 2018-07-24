let express = require('express');
    path = require('path'),
    exphbs = require('express-handlebars');

let app = express();

//Setup routes
const router = require('./router/index');
app.use('/', router);

let port = process.env.PORT || 9012;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

//Static folder setup
app.use(express.static(path.join(__dirname, 'public')));

// app.use(favicon(path.join(__dirname, 'public', 'favicon.jpeg')));

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');
