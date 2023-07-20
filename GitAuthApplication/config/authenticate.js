module.exports = {
    ensureAuth: function(req,res,next){
        if(req.isAuthenticated()){
            return res.redirect('/user');
        }
            next();
    },
    ensureNotAuth: function(req,res,next){
        if(req.isAuthenticated()){
            return next();
        }
            res.redirect('/')
    }
}