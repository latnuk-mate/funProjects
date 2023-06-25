// configure all the nessaary settings of the app..
require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const marked = require('marked');
const Path = require('path');
const Articles = require('./Model/Article');
//conneting with the database;
let database = async()=> {
	try{
	await mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true})
	console.log('we are connected to the database');
}catch(err){
	console.log(err)
}};
database();

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(methodOverride("_method"));
// serving static files 
app.use(express.static(Path.join(__dirname, './Styles')));
marked.use({
  mangle: false,
  headerIds: false,
});

// let's call all the routers..
 app.use('/articles', require('./routes/article.js'));

app.get('/', async (req,res,next)=>{
 let article = await Articles.find().sort({createdAt: 'desc'});
  res.render('article', {articles: article});
});



app.listen(port, ()=>{
  console.log(`server is running on port ${port}`);
});
