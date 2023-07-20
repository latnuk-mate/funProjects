const passport = require('passport');
const GitStrategy = require('passport-github2').Strategy;
const User = require('../Model/User');

module.exports = function gitInitialize() {
  const authenticateGit = async (accessToken, refreshToken, profile, done) => {
        const ClientInfo = {
          userId: profile.id,
          userName: profile.username,
          displayName: profile.displayName,
          ProfileUrl: profile.profileUrl,
          Image: profile.photos[0].value   
        }; 
    let user = await User.findOne({userId:profile.id})
  try{
      if(user != null){
      done(null, user)
    }else{
        user = await User.create(ClientInfo);
        done(null, user);
    }
  }catch(err){
      done(err) }
  }  // done configuring the authorization function.
  passport.use(new GitStrategy({
    clientID: process.env.GIT_CLIENT_ID,
    clientSecret: process.env.GIT_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
  }, authenticateGit));


  passport.serializeUser((user, done) => { done(null, user.id) });
  passport.deserializeUser(function(user, done) {
    User.findById(user, (err, id) => {
      return done(null, id)
    })
  });
};