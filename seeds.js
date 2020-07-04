var mongoose = require("mongoose");
var Campground = require("./models/campgrounds");
var Comment = require("./models/comments");

var data = [
	{ 	
		name: "Detroite",
		image: "image/img1.jpg",
		description: "In modern corporate firms, ownership is usually separated from control which often gives rise to the principal-agent problem (Jensen and Meckling, 1976). Agents (managers) are saddled with the responsibility of making decisions to promote the interest of their principals  (shareholders); however, in reality they often pursue their own interests and not those of the shareholders. For instance, managers may exert unsatisfactory work effort; indulge in consuming bonuses; choose inputs that suit their own preferences, thus distorting the value maximizing objective of shareholders (Berger and Bonaccorsi di Patti, 2006). "
	},
	{ 	
		name: "New York",
		image: "image/img2.jpg",
		description: "In modern corporate firms, ownership is usually separated from control which often gives rise to the principal-agent problem (Jensen and Meckling, 1976). Agents (managers) are saddled with the responsibility of making decisions to promote the interest of their principals  (shareholders); however, in reality they often pursue their own interests and not those of the shareholders. For instance, managers may exert unsatisfactory work effort; indulge in consuming bonuses; choose inputs that suit their own preferences, thus distorting the value maximizing objective of shareholders (Berger and Bonaccorsi di Patti, 2006). "
	},
	{ 	
		name: "Atlanta",
		image: "image/img3.jpg",
		description: "In modern corporate firms, ownership is usually separated from control which often gives rise to the principal-agent problem (Jensen and Meckling, 1976). Agents (managers) are saddled with the responsibility of making decisions to promote the interest of their principals  (shareholders); however, in reality they often pursue their own interests and not those of the shareholders. For instance, managers may exert unsatisfactory work effort; indulge in consuming bonuses; choose inputs that suit their own preferences, thus distorting the value maximizing objective of shareholders (Berger and Bonaccorsi di Patti, 2006). "
	}
]

function seedDB(){
	Campground.deleteMany({}, function(err){
		/*if (err) {
			console.log(err);
		}
		console.log("removed Campgrounds");
		data.forEach(function(seed){
		Campground.create(seed, function(err, newCamp){
			if (err) {
				console.log(err);
			}else{
				console.log("added a camgrounds");
				Comment.create(
				{
					text: "Dream cities",
					author: "Holmes"
				}, function(req, comment){
					if (err) {
						console.log(err);
					}else{
						newCamp.comments.push(comment);
						newCamp.save();
						console.log("new comments created");
					}
					
				});
			}
		})
	})*/
	});
	//add a few camgrounds
	
	

}

 
module.exports = seedDB;
