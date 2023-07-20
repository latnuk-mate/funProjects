const router = require('express').Router();
const User = require('../Model/User');
const {ensureAuth, ensureNotAuth} = require('../config/authenticate')



// Signning in to this app..
router.get('/', ensureAuth, (req, res, next) => {
  res.render('login', { layout: "./layouts/login" })
})


router.get('/user', ensureNotAuth, async(req,res,next)=>{
        try{
            let user = await User.findOne({_id : req.user.id});
            res.render('index', {user})
        }catch(err){
            console.log(err);
            res.redirect('/')
        }
});
module.exports = router;