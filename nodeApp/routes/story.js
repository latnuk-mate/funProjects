const express = require('express')
const router = express.Router();
const Story = require('../model/story');
const { NotAuthUser } = require('../middleware/isvalid');
const { route } = require('./auth');

router.get('/add', NotAuthUser, (req,res,next)=>{
	res.render('stories/add_story', {stories : new Story()})
});

router.post('/', NotAuthUser, async(req,res,next)=>{
	try{
	req.body.user = req.user.id;
	 await Story.create(req.body);
	 
	res.redirect('/dashboard');
}catch(err){
	console.log(err);
	res.json(err);
}
});

router.get('/', NotAuthUser, async (req,res,next)=>{
	try{
	let stories = await Story.find({status : 'public'})
	.populate('user')
	.sort({createdAt: 'desc'})
	.lean()

	res.render('stories/story', { stories,
	helper : require('../views/helpers/helper')
 });
}catch(err){console.log(err)}
})

// Edit stories...
router.get('/edit:id', async(req,res, next)=>{
	let story = await Story.find({id : req.params.id});
	res.render('stories/storyEdit', {stories : story});
})

module.exports = router;
