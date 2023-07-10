const express = require('express')
const router = express.Router();
const Story = require('../model/story');
const { NotAuthUser } = require('../middleware/isvalid');

/*
	@description Create a new Story
	@ route   	/stories/add
*/

router.get('/add', NotAuthUser, (req,res,next)=>{
	res.render('stories/add_story', {stories : new Story()})
});

/*
        @description save a new Story
        @ route         /stories/
*/

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

/*
        @description Display Public Stories
        @ route         /stories
*/

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

/*
        @description Edit Your Story
        @ route         /stories/edit/id(story)
*/
router.get('/edit/:id', NotAuthUser,  async(req,res, next)=>{
	let story =  await Story.findById( req.params.id);
	res.render('stories/EditStory', {stories : story});
});

router.put('/:id', NotAuthUser, async(req,res,next)=>{
	let story = await Story.find({_id : req.params.id });
	if(!story){
	res.json({"Error:": "You don't have any stories"})
	}
	await Story.findByIdAndUpdate({_id: req.params.id}, req.body, {
	new : true
	});
	res.redirect('/dashboard');
});

/*
        @description Remove Stories
        @ route         /stories/delete/id(story)
*/
router.delete('/delete/:id', async(req,res,next)=>{
	let story = await Story.find({_id : req.params.id});
	if(!story){
	res.json({"Error:": "You don't have any stories"})
	}
	await Story.findByIdAndDelete(req.params.id);
	res.redirect('/dashboard');
});

// route for displaying whole story
/*
        @description See Your Stories
        @ route         /stories/view/id(story)
*/
 router.get('/view/:id', async(req,res,next)=>{
	try{
	let story = await Story.findById(req.params.id)
	.populate('user')
	.lean()
	res.render('stories/ViewStory', {story,
	helper : require('../views/helpers/helper')
})
}catch(err){
	console.log(err)
}});

/*
        @description Display only use Specific Stories
        @ route         /stories/user/id(story.user)
*/
router.get("/user/:id", async(req,res,next)=>{
	try{
	let stories = await Story.find(
		{user : req.params.id,
		 status : 'public'}).populate('user').lean() 
	res.render('stories/story', {stories,
	helper : require('../views/helpers/helper')
})
}catch(err){
	res.json({"error" : err});
}});



module.exports = router;
