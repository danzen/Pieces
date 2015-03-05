
var app = function(app) {

	app.Data = function () {
		
		zog("hi from Data");
		var that = this; // give access to object inside functions	
		
		this.hideData = {}; 
		this.findData = {};
		
		// read in from database so I can change them
		this.defaultSponsor1Pic = "danzen.png";				
		this.defaultSponsor1Url = "http://danzen.com";				
		this.defaultSponsor2Pic = "tilty.png";
		this.defaultSponsor2Url = "http://tilty.mobi";	
		this.defaultDataDirectory = "https://s3.amazonaws.com/piecesmobi/";
		
		// general error message
		this.codeError = function(t) {
			zog(t);
		}
		
		// hp.code
		this.addCode = function(codeWord, passWord) {
			// go to database with ajax and find 
			// if codeword is taken - if not, add it to database return true
			// otherwise return false
			that.hideData = {code:codeWord, pass:passWord, status:0, tilePics:[]}
			that.addResult = true;
			that.dispatchEvent("addResult");
		}
		
		this.updateIntro = function(type) {
			// send type to database with ajax to update intro for codeword
			// do not bother responding
			that.hideData.pic = type;
		}
		this.updateSponsorPic = function(type, num) {
			// send type to database with ajax to update intro for codeword
			// do not bother responding
			that.hideData["sponsor"+num+"Pic"] = type;
		}
		
		this.updateTilePic = function(type, num) {
			// send type to database with ajax to update intro for codeword
			// do not bother responding
			that.hideData.tilePics[(num-1)] = type;
		}
		
		this.updateGame = function(odds, time) {
			// send type to database with ajax to update percent and time for codeword
			// do not bother responding
			that.hideData.odds = Number(odds.split("%")[0]) / 100;
			var timeA = time.split(" ");
			var t = Number(timeA[0]);
			if (timeA[1] == "min") {
				t = t * 60;
			} else if (timeA[1] == "day") {
				t = t * 60 * 60 * 24;
			}
			that.hideData.time = t * 1000;
			zog(that.hideData.odds, that.hideData.time);
		}
		
		this.updateStory = function(title, story) {
			that.hideData.title = title;
			that.hideData.story = story;
			zog("updating story");
			// send info to database with ajax for codeword	
		}
		
		// hp.edit
		this.editCode = function(codeWord, passWord) {
			// go to database with ajax and find 
			// if codeword and password match
			// otherwise return false
			
			that.hideData = {
				code:codeWord,
				pass:passWord, 
				title:"Creatures in Corners!",
				story:"In this building, there are creatures that transmorph in corners.  Go to the corners of the rooms and press the look button to see if a creature is there and collect its image.  Find all six creatures and bring your device to the Creature Creator booth to win a prize!\n\nBig thanks to our sponsors - please visit their sites.\n\nHave fun!\nThe Creature Creator Team - 2014.",
				pic:"jpg",
				arrangement:"a6H",	
				tile:6,
				spacing:true,
				tilePics:["jpg","jpg","jpg","jpg","jpg","jpg"],
				sponsor1Pic:"jpg",				
				sponsor1Url:"http://danzen.com",				
				sponsor2Pic:"jpg",
				sponsor2Url:"http://tilty.mobi",
				odds:.7,
				time:5000
			}	
			var d = that.hideData;
			if (d.pic) d.pic = d.code+"_i."+"jpg";
			// only store the extension in the sponsor pics
			// so convert this to the full image code_s1, etc.
			if (d.sponsor1Pic) {
				d.sponsor1Pic = d.code+"_s1."+d.sponsor1Pic;
			} else {
				d.sponsor1Pic = this.defaultSponsor1Pic = "danzen.png";				
				d.sponsor1Url = "http://danzen.com";
			}
			if (d.sponsor2Pic) {
				d.sponsor2Pic = d.code+"_s2."+d.sponsor2Pic;
			} else {
				d.sponsor2Pic = this.defaultSponsor2Pic = "tilty.png";
				d.sponsor2Url = "http://tilty.mobi";
			}
			if (d.tilePics) {
				for (var i=0; i<d.tilePics.length; i++) {
					d.tilePics[i] = d.code+"_t"+(i+1)+"."+d.tilePics[i];
				}
			}
			that.editResult = true;
			that.dispatchEvent("editResult");
		}
		
		//tilePics:["c_1.jpg","c_2.jpg","c_3.jpg","c_4.jpg","c_5.jpg","c_6.jpg"],	
						
		this.checkCode = function(codeWord) {
			
			//AJAX to go to database and check code phrase	
		
			that.findData = {
				code:codeWord,
				title:"Creatures in Corners!",
				story:"In this building, there are creatures that transmorph in corners.  Go to the corners of the rooms and press the look button to see if a creature is there and collect its image.  Find all six creatures and bring your device to the Creature Creator booth to win a prize!\n\nBig thanks to our sponsors - please visit their sites.\n\nHave fun!\nThe Creature Creator Team - 2014.",
				pic:"jpg",
				arrangement:"a6H",	
				tile:6,
				spacing:true,
				tilePics:["jpg","jpg","jpg","jpg","jpg","jpg"],
				sponsor1Pic:null,				
				sponsor1Url:"http://danzen.com",				
				sponsor2Pic:null,
				sponsor2Url:"http://tilty.mobi",
				odds:.7,
				time:1000
			}	
			var d = that.findData;
			if (d.pic) d.pic = d.code+"_i."+"jpg";
			// only store the extension in the sponsor pics
			// so convert this to the full image code_s1, etc.
			if (d.sponsor1Pic) {
				d.sponsor1Pic = d.code+"_s1."+d.sponsor1Pic;
			} else {
				d.sponsor1Pic = this.defaultSponsor1Pic = "danzen.png";				
				d.sponsor1Url = "http://danzen.com";
			}
			if (d.sponsor2Pic) {
				d.sponsor2Pic = d.code+"_s2."+d.sponsor2Pic;
			} else {
				d.sponsor2Pic = this.defaultSponsor2Pic = "tilty.png";
				d.sponsor2Url = "http://tilty.mobi";
			}
			if (d.tilePics) {
				for (var i=0; i<d.tilePics.length; i++) {
					d.tilePics[i] = d.code+"_t"+(i+1)+"."+d.tilePics[i];
				}
			}
			that.checkResult = true;
			that.dispatchEvent("checkResult");
		}	
		
		this.writeData = function() {
			// store hideData to database
			zog("writing hideData");
			
		}
	}
	
	app.Data.prototype = new createjs.EventDispatcher();
	app.Data.prototype.constructor = app.Data;		

	return app;
} (app || {});

