const express = require('express')
const router = express.Router();
const Story = require('../model/story')
const { AuthUser , NotAuthUser } = require('../middleware/isvalid');

router.get('/', AuthUser, (req,res,next)=>{
	res.render('login', {
	layout: 'layouts/login'
});
})

router.get('/dashboard', NotAuthUser, async (req,res)=>{
	//console.log(req.user);
	try{
	let stories = await Story.find({user: req.user.id}).lean();
	res.render('dashboard', {
	name: req.user.firstName,
	helper: require('../views/helpers/helper'),
	stories
	})
	}catch(err){console.log(err)}
});



module.exports = router;
