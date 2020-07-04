require('dotenv').config()
var express = require("express"),
	app = express(),
	request = require("request"),
	bodyParser = require("body-parser"),
	Campground = require("./models/campgrounds.js"),
	Comment = require("./models/comments.js"),
	flash = require("connect-flash"),
	methodOverride = require("method-override"),
	passport = require("passport"),
	LocalStrategy = require("passport-local"),
	User = require("./models/user"),
	seedDB = require("./seeds");
	
var commentRoutes = require("./routes/comments"),
	campgroundRoutes = require("./routes/campgrounds"),
	indexRoutes = require("./routes/index");

var  mongoose = require("mongoose");
const Schema = mongoose.Schema;
const schema = new Schema({ name: String }, {
  writeConcern: {
    w: 'majority',
    j: true,
    wtimeout: 1000
  }
});
/*izleq2mNlbrgxZyr*/
//mongodb://localhost:27017/img_db
mongoose.connect(process.env.DATABASEURL, {useNewUrlParser: true, useUnifiedTopology: true})
//victoricon:<password>@yelpcamp-wrmsi.mongodb.net/test?retryWrites=true&w=majority

/*const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://victor:izleq2mNlbrgxZyr@yella-dqlw9.mongodb.net/test?retryWrites=true&w=majority/yelpcamp";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true});
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
*/



app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static( __dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

/*seedDB();*/

// PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "yelp yelp",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser()); 
app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
})


// ==============
// AUTH ROUTES
// ==============
app.use(indexRoutes);

// ==========
// CAMPGROUNDS ROUTES
// ==========
app.use("/campgrounds", campgroundRoutes);

// ==================
// Comments Routes
// =================
app.use("/campgrounds/:id/comments", commentRoutes);




app.listen(process.env.PORT, process.env.IP);


/*app.listen(3000, function(){  
	console.log("Yelp Server running");
});*/





