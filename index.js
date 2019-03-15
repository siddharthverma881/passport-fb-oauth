var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

app.use(bodyParser.json());
app.use(session({
    secret: 'I am doing this secretely',
    resave: true,
    saveUninitialized: true
}));

var fbOpts = {
    clientID : '2054517944849082',
    clientSecret : '66b1b2d8d0313bb3a089be335e3215ea',
    callbackURL : 'http://localhost:4000/api/facebook/callback',
    profileFields : ['emails']
};

var fbCallBack = function(accessToken ,refreshToken , profile , cb){
    //console.log(accessToken , refreshToken , profile);
    /*if (profile) {
        user = profile;
        return done(null, user);
        }
        else {
        return done(null, false);
        }*/
    cb(null,profile);
};

passport.use(new FacebookStrategy(fbOpts, fbCallBack));

passport.serializeUser(function(user,cb) {
    cb(null,user);
});
passport.deserializeUser(function(obj,cb) {
    cb(null,obj);
});

app.use(passport.initialize());
app.use(passport.session());

/*app.route('/')
    .get(passport.authenticate('facebook'));
app.route('/auth/facebook/callback')
    .get(passport.authenticate('facebook' , function(req,res){
        console.log('successful');
    }));

*/
app.get('/api/facebook/callback' , passport.authenticate('facebook' , {scope : ['email']}));
app.get('/api/facebook/callback' , passport.authenticate('facebook' , {failureRedirect: ' '}),
    function(req,res){
        //return res.redirect('https://localhost:4000/profile/?id='+ this.id);
        return res.send('successful');
    }
);
/*app.route('/')
    .get(passport.authenticate('facebook'));

app.route('/auth/facebook/callback')
    .get(passport.authenticate('facebook' , function(err,user,info) {
        console.log(err,user,info);
    }));
*/

app.listen(4000);