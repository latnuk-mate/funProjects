// configure all the nessaary settings of the app..
require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const Path = require('path');
const port = process.env.PORT || 4000;
const methodOverride = require('method-override');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');

// connecting the database
const databaseConf = require('./config/database');
databaseConf();
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(expressLayouts);
app.set('views', './views');
app.set('view engine', 'ejs');
app.set('layout', './layouts/main');
// serving static files
app.use(express.static(Path.join(__dirname, 'static')));
if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'));
}
// getting passport config..
const passConfig = require('./config/passConf');
passConfig();

app.use(session({
   secret: 'secret is the key',
   resave: false,
   saveUninitialized:false,
   store: MongoStore.create({
	mongoUrl: process.env.MONGO_URI,
        mongooseConnection: mongoose.connection})
}));
app.use(passport.initialize());
app.use(passport.session());

// configuing user global variable...
app.use((req,res,next)=>{
	res.locals.user = req.user || null;
	next();
});
// overriding HTTP METHOD  to make session logged out.
app.use(methodOverride('_method'))
//other routes...
const authPage = require('./routes/auth');
app.use('/auth', authPage);
app.use('/',  require('./routes/main'));
app.use('/stories', require('./routes/story'));



app.listen(port, ()=>{
  console.log(`server is running in ${process.env.NODE_ENV} mode on port ${port}`);
})
