const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const Articles = require('../Model/Article');


router.get('/create', (req,res,next)=>{
	res.render('createArticle', {article: new Articles()});
});

router.post('/',(req,res,next)=>{
	req.article = new Articles();
	next();
}, saveArticles('createArticle'));




router.get('/:slug', async(req,res,next)=>{
	let article = await Articles.findOne({slug: req.params.slug});
	if(article == null){
	res.redirect('/'); }
res.render('ArticleDashboard', {article: article});
});


router.get('/edit/:id', async (req,res,next)=>{
	let articles = await Articles.findById(req.params.id);
	res.render('ArticleEdit', { article : articles});
});

router.put('/:id', async(req,res,next)=>{
	req.article = await Articles.findById(req.params.id);
	next();
}, saveArticles('edit'));

// overriding methods
router.delete('/delete/:id', async(req,res,next)=>{
	try{
	await Articles.findByIdAndDelete(req.params.id);
	res.redirect('/');
}catch(err){
	res.status(500).send();
}
});



function saveArticles(path){
        return async (req,res)=>{
        let article = req.article;
        article.title = req.body.title
        article.description = req.body.description
        article.markdown = req.body.markdown
        try{
          article = await article.save();
	res.redirect(`/articles/${article.slug}`);
        }catch(err){
        console.log(err);
        res.render(`${path}`, {article: article});
}}
};

module.exports = router;
