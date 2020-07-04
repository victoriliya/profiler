var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campgrounds");
var Comment = require("../models/comments");
var middleware = require("../middleware");

router.get("/new", middleware.isLoggedIn, function(req, res){
	Campground.findById(req.params.id, function(err, campground){
		if (err) {
			console.log(err)
		}else{
			res.render("comments/new", {campground: campground});
		}
	});
});

router.post("/", middleware.isLoggedIn, function(req, res){
	// lookup campgrounds using id
	Campground.findById(req.params.id, function(err, campground){
		if (err) {
			console.log(err);
			res.redirect("/campgrounds");
		}else{
			// create new comment
			Comment.create(req.body.comment, function(err, comment){
				if (err) {
					req.flash("error", "Database is sick");
					console.log(err);
				}else{
					// connect new comment to campground
		
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save();
					// add username and id to comment
					campground.comments.push(comment);
					campground.save();
					console.log(comment);
					//redirect to campground show page
					req.flash("success", "Successfully Added Comment");
					res.redirect('/campgrounds/'+ campground._id);  
				}
			});
		}
		
	});
	console.log(req.body.comment);
});

//COMMENT EDIT

router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
	Comment.findById(req.params.comment_id, function(err, foundComment){
		if (err) {
			res.redirect("back");
		}else{
			res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
		}
	});
	
});

// COMMENT UPDATE

router.put("/:comment_id", middleware.checkCommentOwnership , function(req, res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
		if (err) {
			res.redirect("back");
		}else{
			res.redirect("/campgrounds/" + req.params.id);
		}		
	});
});

// COMMENT DESTROY ROUTES
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
	//find by id and remove
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if (err) {
			res.redirect("back");
		}else{
			req.flash("success", "Comment Deleted");
			res.redirect("/campgrounds/"+req.params.id);
		}
	});
});


module.exports = router;


