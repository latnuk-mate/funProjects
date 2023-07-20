const router = require('express').Router();
const passport = require('passport');

/*
	FIRST ROUTE: @desc fetching git user info 
		     @route /auth/callback
	SECOND ROUTE: @desc authenticate via Git Oauth
		     @ route /auth/callback/gitauth
	THIRD ROUTE: @desc logging out
		     @route /auth/logout
 */

// initializing the github api 
router.get('/callback', passport.authenticate('github', { scope: [ 'user:email' ] }));


// collecting git info
router.get('/callback/gitauth', passport.authenticate('github',
  { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/user');
  });


  router.get('/logout', (req,res,next)=>{
    req.logOut((err)=>{
        if(err){
            throw err;
        }
    });
    res.redirect('/');
})



module.exports = router;