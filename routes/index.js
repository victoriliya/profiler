var express = require("express");
var router = express.Router();
passport = require("passport");
User = require("../models/user"),

router.get("/", function(req, res){
	res.render("landing");
});

router.get("/register", function(req, res){
	res.render("register");
});


//handle sign up logic
router.post("/register", function(req, res){
	var newUser = new User({username: req.body.username});
	User.register( newUser, req.body.password, function(err, user){
		if (err) {
			console.log(err);
			req.flash("error", "Use Already Registered");
			res.redirect("/register");
		}
		passport.authenticate("local")(req, res, function(){
			req.flash("success", "Welcome to fun world");
			res.redirect("/campgrounds");
		});
	})
});

// show login form
router.get("/login", function(req, res){
	res.render("login");
});

//handling login login
router.post("/login", passport.authenticate("local", 
	{
		successRedirect: "/campgrounds",
		failureRedirect: "/login"}), function(req ,res){

});

// handle logout
router.get("/logout", function(req, res){
	req.logout();
	req.flash("success", "Your Logged Out!");
	res.redirect("/campgrounds");
});

module.exports = router;