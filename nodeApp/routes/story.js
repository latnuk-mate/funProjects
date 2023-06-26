const express = require('express')
const router = express.Router();
const Story = require('../model/story')
const User = require('../model/User');
const { NotAuthUser } = require('../middleware/isvalid');

let newUser = new User();
let newStories = new Story();

router.get('/add', NotAuthUser, (req,res,next)=>{
	res.render('stories/add_story')
});

router.post('/', NotAuthUser, async(req,res,next)=>{
	try{
	req.body.user = req.user.id;
	// await newStory.create(req.body);
	 //newStory.user.push(newUser);
	// await newStory.save((err)=>{
	if(err) throw err; });
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

	res.render('stories/story', { stories });

}catch(err){console.log(err)}
})


module.exports = router;