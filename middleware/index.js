var Campground = require("../models/campgrounds");
var Comment = require("../models/comments");

var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){

	if(req.isAuthenticated()){
		Campground.findById(req.params.id, function(err, foundCampground){
			if (err) {
				req.flash("error", "Campground Not Found");
				res.redirect("back");
			}else{
			//does user posted the campground
				if (foundCampground.author.id.equals(req.user._id)) {
					next();
				}else{
					req.flash("error", "You Dont Have Permission To Do That");
					res.redirect("back");
				}				
			}
		});
	}else{
		req.flash("error", "You Need To Log In First");
		res.redirect("back");
	}
}

middlewareObj.checkCommentOwnership = function(req, res, next){

		if(req.isAuthenticated()){
			Comment.findById(req.params.comment_id, function(err, foundComment){
				if (err) {
					res.redirect("back");
				}else{
				//does user posted the campground
					if (foundComment.author.id.equals(req.user._id)) {
						next();
					}else{
						req.flash("error", "You Dont Have Permission");
						res.redirect("back");
					}				
				}
			});
		}else{
			req.flash("error", "You Need To Log In First");
			res.redirect("back");
		}

}

middlewareObj.isLoggedIn = function (req, res, next){
	if (req.isAuthenticated()) {
		return next();
	}
	req.flash("error", "You Need To Log In First!");
	res.redirect("/login");
}

module.exports = middlewareObj;