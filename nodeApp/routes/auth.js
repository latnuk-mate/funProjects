const express = require('express');
const router = express.Router();
const passport = require('passport');

/*
	FIRST ROUTE: @desc fetching google info 
		     @route /auth/google
	SECOND ROUTE: @desc authenticate via google
		     @ route /auth/google/callback
	THIRD ROUTE: @desc logging out
		     @route /auth/logout
 */
router.get('/gauth', passport.authenticate('google', {
scope: ['profile']
}));

router.get('/gauth/callback' , passport.authenticate('google', {
	failureRedirect: '/'
}), (req,res,next)=>{
	res.redirect('/dashboard');
});

router.get('/logout', (req,res,next)=>{
	req.logout((err)=>{
	if(err){
	throw err; }
});
  res.redirect('/');
});


module.exports = router;
