
var express = require("express");
var router = express.Router();
var Campground = require("../models/campgrounds");
var middleware = require("../middleware");
var multer = require('multer');
var storage = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});
var imageFilter = function (req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
var upload = multer({ storage: storage, fileFilter: imageFilter})

var cloudinary = require('cloudinary');
cloudinary.config({ 
  cloud_name: 'vickcloud', 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});
router.get("/", function(req, res){
	// Get all campgrounds from DB 
	Campground.find({}, function(err, allCampgrounds){
		if (err) {
			console.log(err);
		}else{
			res.render("campgrounds/index", {campgrounds:allCampgrounds, currentUser:req.user});
		}
	});
});

router.post("/", middleware.isLoggedIn,upload.single('image'), function(req, res){

cloudinary.uploader.upload(req.file.path, function(result) {
  // add cloudinary url for the image to the campground object under image property
  req.body.campground.image = result.secure_url;
  // add author to campground
  req.body.campground.author = {
    id: req.user._id,
    username: req.user.username
  }
  Campground.create(req.body.campground, function(err, campground) {
    if (err) {
      req.flash('error', err.message);
      return res.redirect('back');
    }
    res.redirect('/campgrounds/' + campground.id);
  });
});
	

	
});

router.get("/new", middleware.isLoggedIn, function(req, res){
	req.flash("error", "You Need To Log In First");
	res.render("campgrounds/new");
});

router.get("/:id", function(req, res){
	//find campground id from db	
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){	
		if(err){
			console.log(err);
		}else{
			res.render("campgrounds/show", {campground:foundCampground});			
		}

	});
	
});


//EDIT ROUTER
router.get("/:id/edit", middleware.checkCampgroundOwnership ,function(req, res){
	// is user logged in
	Campground.findById(req.params.id, function(err, foundCampground){
		
		res.render("campgrounds/edit", {campground: foundCampground});	
	});
});


//UPDATE
router.put("/:id", middleware.checkCampgroundOwnership ,function(req, res){
	//find and correct the campground
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
		if (err) {
			res.redirect("/campgrounds");
		}else{
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
	
});

//DELETE CAMPGROUND
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
	Campground.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/campgrounds/");
		}else{
			res.redirect("/campgrounds/");
		}
	});
});






module.exports = router;