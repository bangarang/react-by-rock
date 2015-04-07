// load all the things we need
var LocalStrategy    = require('passport-local').Strategy;
// var InstagramStrategy = require('passport-instagram').Strategy;

// load up the user model
var User       = require('../models/user');

// load the auth variables
var configAuth = require('./auth'); // use this one for testing

module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id)
        .exec(function(err, user) {
            done(err, user);
        });
    });

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    function(req, email, password, done) {

        // asynchronous
        process.nextTick(function() {
            User.findOne({ 'local.email' :  email }, function(err, user) {
                // if there are any errors, return the error
                if (err)
                    return done(err);

                // if no user is found, return the message
                if (!user) {
                    // return done(null, false, req.flash('loginMessage', 'No user found.'));
                    return done(null, false, { message: 'No user found.' });
                }

                if (!user.validPassword(password)){
                    // return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
                    return done(null, false, { message: 'Incorrect password.' });
                }

                // all is well, return user
                else 
                    return done(null, user);
                    
                
            });
        });

    }));

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    function(req, email, password, done) {

        // asynchronous
        process.nextTick(function() {

            //  Whether we're signing up or connecting an account, we'll need
            //  to know if the email address is in use.
            User.findOne({'local.email': email}, function(err, existingUser) {

                // if there are any errors, return the error
                if (err)
                    return done(err);

                // check to see if there's already a user with that email
                if (existingUser) {
                    // return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                    return done(null, false);
                }

                //  If we're logged in, we're connecting a new local account.
                if(req.user) {
                    var user            = req.user;
                    user.local.email    = email;
                    user.local.password = user.generateHash(password);
                    user.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, user);
                    });
                } 
                //  We're not logged in, so we're creating a brand new user.
                else {
                    // create the user
                    var newUser            = new User();

                    newUser.local.email    = email;
                    newUser.local.password = newUser.generateHash(password);

                    newUser.save(function(err) {
                        if (err)
                            throw err;

                        return done(null, newUser);
                    });
                }

            });
        });

    }));

    // =========================================================================
    // INSTAGRAM ===============================================================
    // =========================================================================
    // passport.use(new InstagramStrategy({

    //     clientID        : configAuth.instagramAuth.clientID,
    //     clientSecret    : configAuth.instagramAuth.clientSecret,
    //     callbackURL     : configAuth.instagramAuth.callbackURL,
    //     passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)

    // },
    // function(req, token, refreshToken, profile, done) {

    //     // asynchronous
    //     process.nextTick(function() {

    //         // check if the user is already logged in
    //         if (!req.user) {

    //             User.findOne({ 'instagram.id' : profile.id }, function(err, user) {
    //                 if (err)
    //                     return done(err);

    //                 if (user) {

    //                     // if there is a user id already but no token (user was linked at one point and then removed)
    //                     if (!user.instagram.token) {
    //                         user.instagram.token = token;
    //                         user.instagram.name  = profile.username;
    //                         user.instagram.displayName  = profile.displayName;
    //                         // user.instagram.email = profile.emails[0].value;

    //                         user.save(function(err) {
    //                             if (err)
    //                                 throw err;
    //                             return done(null, user);
    //                         });
    //                     }

    //                     return done(null, user); // user found, return that user
    //                 } else {
    //                     // if there is no user, create them
    //                     var newUser            = new User();

    //                     newUser.instagram.id    = profile.id;
    //                     newUser.instagram.token = token;
    //                     newUser.instagram.name  = profile.username;
    //                     newUser.instagram.displayName  = profile.displayName;

    //                     newUser.save(function(err) {
    //                         if (err)
    //                             throw err;
    //                         return done(null, newUser);
    //                     });
    //                 }
    //             });

    //         } else {
    //             // user already exists and is logged in, we have to link accounts
    //             var user            = req.user; // pull the user out of the session

    //             user.instagram.id    = profile.id;
    //             user.instagram.token = token;
    //             user.instagram.name  = profile.username;
    //             user.instagram.displayName  = profile.displayName;

    //             user.save(function(err) {
    //                 if (err)
    //                     throw err;
    //                 return done(null, user);
    //             });

    //         }
    //     });

    // }));

};

