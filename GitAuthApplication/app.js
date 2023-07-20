require('dotenv').config();
const express = require('express');
const app = express();
const ejsLayouts = require('express-ejs-layouts');
const Path = require('path');
const passport = require('passport');
const session = require('express-session');
const morgan = require('morgan');
const methodOverride = require('method-override')

const dbconnection = require('./config/database');
dbconnection(); // calling up the database.

if(process.env.NODE_ENV !== 'production'){
    app.use(morgan('dev'))
}
// setting up the view engine..
app.set('views', './views');
app.set('view engine', 'ejs');
app.set('layout', './layouts/main');
app.use(ejsLayouts);
app.use(express.static(Path.join(__dirname, './Vendors')));
app.use(methodOverride('_method'))
const passConfig = require('./config/passConf')
passConfig();
app.use(session({
  secret: 'a secret key is there',
  saveUninitialized: false,
  resave: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./routes/main'));
app.use('/auth', require('./routes/auth'));



app.listen(5000, () => {
  console.log('server is running on port 5000');
});
