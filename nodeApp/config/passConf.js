// This is whole passport google function..
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const mongoose = require('mongoose');
const User = require('../model/User');

module.exports = function(){
    let callback = async(accessToken, refreshToken, profile, done)=>{
	let newUser = {
	googleId: profile.id,
	displayName: profile.displayName,
	firstName: profile.name.givenName,
	lastName: profile.name.familyName,
	image 	: profile.photos[0].value
	}
	let user = await User.findOne({googleId: profile.id});
	try{
	if(user){
	done(null, user); }
	else{
	user = await User.create(newUser);
	done(null, user);
}
}catch(err){done(err)}

}; //configuring the verify callback

passport.use( new GoogleStrategy({
     clientID: process.env.GOOGLE_CLIENT_ID,
     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
     callbackURL: '/auth/gauth/callback'
    }, callback));

    passport.serializeUser((user, done)=> done(null, user.id));
    passport.deserializeUser(async(id, done)=>{
    await User.findById(id, (err, user)=> done(err, user));
});
};
