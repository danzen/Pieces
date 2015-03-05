
var app = function(app) {
	
	app.tileW = 300;
	app.spacing = 20;
	app.gutter = 50;
	app.sponsorW = 150;
	app.tilesMade = false;
	
	app.arrangements = {
		a1  : [1,0,0,0,0,0,0,0,0],
		a2V : [1,0,0,1,0,0,0,0,0],
		a2H : [1,1,0,0,0,0,0,0,0],
		a3V : [1,0,0,1,0,0,1,0,0],
		a3H : [1,1,1,0,0,0,0,0,0],
		a4  : [1,1,0,1,1,0,0,0,0],
		a6V : [1,1,0,1,1,0,1,1,0],
		a6H : [1,1,1,1,1,1,0,0,0],
		a9  : [1,1,1,1,1,1,1,1,1]
	};
	app.arrLookup = ["a1", "a2V", "a2H", "a3V", "a3H", "a4", "a6V", "a6H", "a9"];
	app.arrNums = [1, 2, 2, 3, 3, 4, 6, 6, 9];
	
	// pre pic tiles
	app.drawTile = function(char) {
		if (zot(char)) char = "?";
		var tile = new cjs.Container();
		var backing = new cjs.Shape();
		var g = backing.graphics;			
		g.f("black").ss(10).s("#edda27").r(0,0,app.tileW,app.tileW);					
		tile.addChild(backing);			
		var q = new cjs.Text(char, "300px wildwoodBold", "#edda27"); 
		q.textBaseline = "middle";
		q.textAlign = "center";		
		q.x = app.tileW/2; 
		q.y = app.tileW/2; 
		tile.addChild(q);						
		tile.setBounds(0,0,app.tileW,app.tileW);			
		return tile;			
	}	
	
	app.setTiles = function(d, type, char) {
		// set up tiles
		// tile the pieces in their arrangement max 3 across or down:
		// 1, 2H, 2V, 3H, 3V, 4, 6H, 6V, 9
		// could be together (one picture) or spaced (individual pictures)
		// squares get ? before they are found and fill in with images when found
		// arrangements below handle relative positioning, scaling is done after
		
		var a = app.arrangements[d.arrangement];
		d.tiles = 0;
		d.numShowing = 0;
		d.tileOrder = [];
		for (i=0; i<a.length; i++) {
			if (a[i] == 1) {						
				d.tileOrder.push(d.tiles++);
			}
		}
		zim.shuffle(d.tileOrder);
		if (type.tiles) {
			type.tiles.removeAllChildren();
			type.tileContent.removeChild(type.tiles);
		}
		if (type.tilePics) {
			type.tilePics.removeAllChildren();
			type.tileContent.removeChild(type.tilePics);
		}
							
		var count = 0;
		var countAdded = 1;
		var spacing = (d.spacing) ? app.spacing : 0;
		for (var i=0; i<3; i++) {
			for (var j=0; j<3; j++) {
				if (a[count] == 1) {
					var tile = app.drawTile(char);
					tile.num = count;
					tile.mouseChildren = false;
					tile.x = j * (tile.getBounds().width + spacing); 
					tile.y = i * (tile.getBounds().height + spacing); 	
					type.tiles.addChild(tile);												
					countAdded++
				}
				count++;
			}
		}
		type.tiles.x = app.gutter;
		type.tiles.y = app.gutter;
		var padding = app.gutter / 2;
		var f = zim.fit(
			type.tiles,
			type.tileBacking.x+padding,
			type.tileBacking.y+padding,
			type.tileBacking.getBounds().width-padding*2, 
			type.tileBacking.getBounds().height-padding*2
		);
		type.tiles.alpha = .9
		type.tilePics.x = f.x;
		type.tilePics.y = f.y;
		zim.scale(type.tilePics, f.scale);
		type.tileContent.addChild(type.tilePics); // for non-spaced pics only
		type.tileContent.addChild(type.tiles);	
	}
	
	app.uploadIntro = function() {
		var fileName = zid("hpIntroUpload").value;
		var file = zid("hpIntroUpload").files[0];
		var type = file.type.split("/")[1];
		if (type == "jpeg") type = "jpg";
		
		data.updateIntro(type);

		waiter.show();
		if (!FileReader) { // will not work on earlier IE
			waiter.hide();
			alert("Please update your Browser - Sorry");
			return;		
		}
		var reader  = new FileReader(); 
		reader.onloadend = function () {							
			// the AJAX code
			var client = new HttpClient();		
			client.isAsync = true;	
			client.callback = function(result) {
				if (result == "error=0") {
					if (data.hideData.pic) {
						var hidePicsManifest = [];
						hidePicsManifest.push({id:"intro", src:data.hideData.code+"_i."+data.hideData.pic});
						app.hidePicsLoader.reset();
						app.hidePicsLoader.loadManifest(hidePicsManifest);
					} else {
						waiter.hide();
					}
				} else {
					waiter.hide();
				}
			}					
			var string = data.hideData.code + "_i,800," + type + "," + reader.result;
			client.makeRequest('image.php', string, "application/upload");		   
		}				
		if (file) reader.readAsDataURL(file);		
	}


	app.uploadSponsor = function(num) {
		zog("loading " + num);
		var fileName = zid("hpSponsorUpload"+num).value;
		var file = zid("hpSponsorUpload"+num).files[0];
		var type = file.type.split("/")[1];
		if (type == "jpeg") type = "jpg";
		
		data.updateSponsorPic(type, num);

		waiter.show();
		if (!FileReader) { // will not work on earlier IE
			waiter.hide();
			alert("Please update your Browser - Sorry");
			return;		
		}
		var reader = new FileReader();
		reader.num = num; 
		reader.onloadend = function () {							
			// the AJAX code
			var client = new HttpClient();		
			client.isAsync = true;	
			client.callback = function(result) {
				if (result == "error=0") {
					//if (data.hideData.sponsor1Pic) {
						var hidePicsManifest = [];
						hidePicsManifest.push({id:"sponsor"+num, src:data.hideData.code+"_s"+num+"."+data.hideData["sponsor"+num+"Pic"]+"?rand="+Math.random()});
						zog(hidePicsManifest);
						app.hidePicsLoader.reset();
						app.hidePicsLoader.loadManifest(hidePicsManifest);
					//} else {
						//waiter.hide();
					//}
				} else {
					zog("file error");
					waiter.hide();
				}
			}					
			var string = data.hideData.code + "_s"+num+",300," + type + "," + reader.result;
			client.makeRequest('image.php', string, "application/upload");		   
		}				
		if (file) reader.readAsDataURL(file);		
	}
	
	app.uploadTile = function(num) {
		zog(num);
		var fileName = zid("hpTileUpload"+num).value;
		var file = zid("hpTileUpload"+num).files[0];
		var type = file.type.split("/")[1];
		if (type == "jpeg") type = "jpg";
		
		data.updateTilePic(type, num);

		waiter.show();
		if (!FileReader) { // will not work on earlier IE
			waiter.hide();
			alert("Please update your Browser - Sorry");
			return;		
		}
		var reader = new FileReader();
		reader.num = num; 
		reader.onloadend = function () {							
			// the AJAX code
			var client = new HttpClient();		
			client.isAsync = true;	
			client.callback = function(result) {
				if (result == "error=0") {
					//if (data.hideData.sponsor1Pic) {
						var hidePicsManifest = [];
						hidePicsManifest.push({id:"tile"+num, src:data.hideData.code+"_t"+num+"."+data.hideData.tilePics[(num-1)]+"?rand="+Math.random()});
						zog(hidePicsManifest);
						app.hidePicsLoader.reset();
						app.hidePicsLoader.loadManifest(hidePicsManifest);
					//} else {
						//waiter.hide();
					//}
				} else {
					zog("file error");
					waiter.hide();
				}
			}					
			var string = data.hideData.code + "_t"+num+",300," + type + "," + reader.result;
			client.makeRequest('image.php', string, "application/upload");		   
		}				
		if (file) reader.readAsDataURL(file);		
	}
	
	app.positionTileButtons = function() {
		
		// gets called from resize and from going to tile page
		// zog("tiles Made: " + app.tilesMade);
		if (!app.tilesMade) return;
		
		var d = data.hideData;
		var b;  var t;
		for (var i=0; i<d.numTiles; i++) {
			t = zss("hpTileUpload"+(i+1));
			b = zim.boundsToGlobal(hp.tiles.getChildAt(i));
			if (b) {
				t.left = (b.x)+"px";
				t.top = (b.y)+"px";	
				t.width = (b.width)+"px";
				t.height = (b.height)+"px";
			}	
		}	
	}
	
	app.showTileButtons = function() {
		var d = data.hideData;
		var t;
		for (var i=1; i<=d.numTiles; i++) {
			t = zss("hpTileUpload"+i);
			t.display = "block";
		}	
	}
	
	app.hideTileButtons = function() {
		var t;
		for (var i=1; i<=9; i++) {
			t = zss("hpTileUpload"+i);
			t.display = "none";
		}	
	}
	
	


	app.makeFunctionality = function () {
		
		////////////////////////////////////////////////
		
		// EXTRA SWIPE FUNCTIONALITY
		
		var countMe=0;
		mainPages.on("page", function(e) {			
			
			// swap Pages objects depending on location
			if (e.target.page == mp.home) {
				findPages.active = false;
				hidePages.active = false;		
			}
			if (e.target.page == mp.find) {
				findPages.active = true;		
			}	
			if (e.target.page == mp.hide) {
				hidePages.active = true;		
			}	
			
			// handle pesky input fields
			if (e.target.page == mp.find && findPages.page == fp.code) {
				zss("fpCodeWord").display = "block";
				zim.animate(fp.codeWord, {alpha:1}, 400);
			}
			if (e.target.lastPage == mp.find) {
				zim.animate(fp.codeWord, {alpha:0}, 200, null, function(){
					zss("fpCodeWord").display = "none";				
				});
			}		
			if (e.target.page == mp.hide && hidePages.page == hp.code) {
				zss("hpMakeCodeWord").display = "block";
				zss("hpMakePassWord").display = "block";
				zim.animate(hp.codeWord, {alpha:1}, 400);
				zim.animate(hp.codePass, {alpha:1}, 400);			
			}
			if (e.target.lastPage == mp.hide && hidePages.page == hp.code) {
				zim.animate(hp.codeWord, {alpha:0}, 200, null, function(){
					zss("hpMakeCodeWord").display = "none";				
				});
				zim.animate(hp.codePass, {alpha:0}, 200, null, function(){
					zss("hpMakePassWord").display = "none";				
				});
			}
			if (e.target.page == mp.hide && hidePages.page == hp.edit) {
				zss("hpCodeWord").display = "block";
				zss("hpPassWord").display = "block";
				zim.animate(hp.editWord, {alpha:1}, 400);
				zim.animate(hp.editPass, {alpha:1}, 400);			
			}			
			if (e.target.lastPage == mp.hide && hidePages.page == hp.edit) {
				zim.animate(hp.editWord, {alpha:0}, 200, null, function(){
					zss("hpCodeWord").display = "none";				
				});
				zim.animate(hp.editPass, {alpha:0}, 200, null, function(){
					zss("hpPassWord").display = "none";				
				});
			}				
			if (e.target.page == mp.hide && hidePages.page == hp.intro) {
				zss("hpIntroUpload").display = "block";			
			}			
			if (e.target.lastPage == mp.hide && hidePages.page == hp.intro) {			
				zss("hpIntroUpload").display = "none";			
			}
			
			if (e.target.page == mp.hide && hidePages.page == hp.tile) {
				app.showTileButtons();	
			}			
			if (e.target.lastPage == mp.hide && hidePages.page == hp.tile) {			
				app.hideTileButtons();		
			}
			
			if (e.target.page == mp.hide && hidePages.page == hp.sponsor) {
				zss("hpSponsorUpload1").display = "block";	
				zss("hpSponsorUpload2").display = "block";	
				zss("hpSponsorUrl1").display = "block";
				zss("hpSponsorUrl2").display = "block";	
				zim.animate(hp.sponsorUrl1, {alpha:1}, 400);
				zim.animate(hp.sponsorUrl2, {alpha:1}, 400);
			}			
			if (e.target.lastPage == mp.hide && hidePages.page == hp.sponsor) {			
				zss("hpSponsorUpload1").display = "none";	
				zss("hpSponsorUpload2").display = "none";
				zim.animate(hp.sponsorUrl1, {alpha:0}, 200, null, function(){
					zss("hpSponsorUrl1").display = "none";			
				});
				zim.animate(hp.sponsorUrl2, {alpha:0}, 200, null, function(){
					zss("hpSponsorUrl2").display = "none";			
				});		
			}
			
			if (e.target.page == mp.hide && hidePages.page == hp.story) {
				zss("hpStoryTitle").display = "block";
				zss("hpStoryText").display = "block";
				zim.animate(hp.storyTitle, {alpha:1}, 400);
				zim.animate(hp.storyText, {alpha:1}, 400);			
			}			
			if (e.target.lastPage == mp.hide && hidePages.page == hp.story) {
				zim.animate(hp.storyTitle, {alpha:0}, 200, null, function(){
					zss("hpStoryTitle").display = "none";				
				});
				zim.animate(hp.storyText, {alpha:0}, 200, null, function(){
					zss("hpStoryText").display = "none";				
				});
			}	
					
		});		
		
		
		hidePages.on("page", function(e) {	
			// handle pesky input fields	
			if (e.target.page == hp.code) {
				zss("hpMakeCodeWord").display = "block";
				//zim.animate(hp.codeWord, {alpha:1}, 400);
				zss("hpMakePassWord").display = "block";
				//zim.animate(hp.codePass, {alpha:1}, 400);				
			}			
			if (e.target.lastPage == hp.code) {
				//zim.animate(hp.codeWord, {alpha:0}, 200, null, function(){
					zss("hpMakeCodeWord").display = "none";
				//});
				//zim.animate(hp.codePass, {alpha:0}, 200, null, function(){
					zss("hpMakePassWord").display = "none";					
				//});
			}
			if (e.target.page == hp.edit) {
				zss("hpCodeWord").display = "block";
				//zim.animate(hp.editWord, {alpha:1}, 400);
				zss("hpPassWord").display = "block";
				//zim.animate(hp.editPass, {alpha:1}, 400);				
			}			
			if (e.target.lastPage == hp.edit) {
				//zim.animate(hp.editWord, {alpha:0}, 200, null, function(){
					zss("hpCodeWord").display = "none";					
				//});
				//zim.animate(hp.editPass, {alpha:0}, 200, null, function(){
					zss("hpPassWord").display = "none";					
				//});
			}
			if (e.target.page == hp.intro) {
				zss("hpIntroUpload").display = "block";			
			}			
			if (e.target.lastPage == hp.intro) {			
				zss("hpIntroUpload").display = "none";			
			}
			if (e.target.page == hp.tile) {
				app.showTileButtons();			
			}			
			if (e.target.lastPage == hp.tile) {			
				app.hideTileButtons();			
			}
			
			if (e.target.page == hp.sponsor) {
				zss("hpSponsorUpload1").display = "block";	
				zss("hpSponsorUpload2").display = "block";	
				zss("hpSponsorUrl1").display = "block";
				zss("hpSponsorUrl2").display = "block";		
			}			
			if (e.target.lastPage == hp.sponsor) {			
				zss("hpSponsorUpload1").display = "none";
				zss("hpSponsorUpload2").display = "none";	
				zss("hpSponsorUrl1").display = "none";
				zss("hpSponsorUrl2").display = "none";			
			}
			if (e.target.page == hp.tile && e.target.lastPage == e.layout) {
				var d = data.hideData
				app.setTiles(data.hideData, hp, "X"); 
			}
			if (e.target.page == hp.story) {
				zss("hpStoryTitle").display = "block";
				zss("hpStoryText").display = "block";				
			}			
			if (e.target.lastPage == hp.story) {
				zss("hpStoryTitle").display = "none";	
				zss("hpStoryText").display = "none";
			}
		});		
		
	
		findPages.on("page", function(e) {
			// this is the automatic paging system
			// sometimes extra things have to happen
			// zog(e.target.page.name, e.target.lastPage.name, e.target.direction);	
			
			if (e.target.page == fp.code) {
				zss("fpCodeWord").display = "block";
				zim.animate(fp.codeWord, {alpha:1}, 400);
			}			
			if (e.target.lastPage == fp.code) {
				zim.animate(fp.codeWord, {alpha:0}, 200, null, function(){
					zss("fpCodeWord").display = "none";
					if (message.words.text == "Scattering...") {
						message.pane.show();
					}
				});
			}
		});
	
		
		//////////////////////////////////////////////////////////////////////////////
	
		// make the HOTSPOTS
		
		// we can add these to rectangles (like image maps)
		// this is handle for making graphical pages clickable in parts
		// or pass in an object like a button
		// and then the function to call
		
		var hs = new zim.HotSpots([
			{page:mp.home.container, rect:[350,50,260,260], 	call:function() {mainPages.go(mp.hide,"up");}},
			{page:mp.home.container, rect:[220,405,500,150], 	call:function() {zog("info");}},
			{page:mp.home.container, rect:[350,650,260,260],	call:function() {mainPages.go(mp.find,"down");}},
			{page:mp.hide.container, rect:[230,800,500,150],	call:function() {mainPages.go(mp.home,"down");}},
			{page:mp.find.container, rect:[230,10,500,150],		call:function() {mainPages.go(mp.home,"up");}},
			
			{page:fp.code, 	rect:fp.codeNext,	call:function() {checkCode();}},
			{page:fp.code, 	rect:fp.codeInfo,	call:function() {zog("info");}},
			{page:fp.intro, rect:fp.introNext,	call:function() {findPages.go(fp.story,"right");}},
			{page:fp.intro, rect:fp.introBack,	call:function() {findPages.go(fp.code,"left");}},
			{page:fp.story, rect:fp.storyNext,	call:function() {findPages.go(fp.tile,"right");}},
			{page:fp.story, rect:fp.storyBack,	call:function() {findPages.go(fp.intro,"left");}},		
			{page:fp.tile, 	rect:fp.tileFind,	call:function() {findPages.go(fp.look,"right");}},
			{page:fp.tile,  rect:fp.tileBack,	call:function() {findPages.go(fp.story,"left");}},				
			{page:fp.look, 	rect:fp.lookButton,	call:function() {look();}},
			{page:hp.first, rect:hp.firstNew,	call:function() {hidePages.go(hp.code,"right");}},
			{page:hp.first, rect:hp.firstEdit,	call:function() {hidePages.go(hp.edit,"right");}},
			{page:hp.code, 	rect:hp.codeNext,	call:function() {addCode();}},
			{page:hp.code,	rect:hp.codeBack,	call:function() {hidePages.go(hp.first,"left");}},
			{page:hp.code, 	rect:hp.codeInfo,	call:function() {zog("info");}},
			{page:hp.code, 	rect:hp.codeInfo2,	call:function() {zog("info2");}},
			{page:hp.edit, 	rect:hp.editNext,	call:function() {editCode();}},
			{page:hp.edit,	rect:hp.editBack,	call:function() {hidePages.go(hp.first,"left");}},
			{page:hp.intro, rect:hp.introNext,	call:function() {showStory();}},
			{page:hp.intro,	rect:hp.introBack,	call:function() {hidePages.go(hp.code,"left");}},
			{page:hp.story, rect:hp.storySave,	call:function() {saveStory();}},
			{page:hp.story,	rect:hp.storyBack,	call:function() {hidePages.go(hp.intro,"left");}},
			{page:hp.pieces,rect:hp.piecesBack,	call:function() {hidePages.go(hp.story,"left");}},
			{page:hp.pieces,rect:hp.piecesSave,	call:function() {saveLayout();}},
			{page:hp.tile,	rect:hp.tileBack,	call:function() {hidePages.go(hp.pieces,"left");}},
			{page:hp.tile,  rect:hp.tileNext,	call:function() {showGame();}},
			{page:hp.tile, 	rect:hp.tileInfo,	call:function() {zog("tile info");}},
			{page:hp.game,	rect:hp.gameBack,	call:function() {hidePages.go(hp.tile,"left");}},
			{page:hp.game,  rect:hp.gameSave,	call:function() {saveGame();}},
			{page:hp.sponsor, rect:hp.sponsorBack,	call:function() {hidePages.go(hp.game,"left");}},
			{page:hp.sponsor, rect:hp.sponsorSave,	call:function() {saveSponsor();}},
			{page:hp.sponsor, rect:hp.sponsorInfo,	call:function() {zog("sponsor info");}}
		]);
		
		// hs.show();
		
		
		////////////////////////////////////////////////
		
		// EXTRA HOTSPOT FUNCTIONALITY
		
		// hp.code
		data.on("addResult", function(e) {	
			//waiter.hide();	
			if (data.addResult) {
				//pages.unpause(); // in case it comes from swipe
				hp.introContent.removeChild(hp.introPic);
				hp.introTile.removeAllEventListeners();
				hp.introTile.on("click", app.uploadIntro);
				
				hidePages.go(hp.intro,"right");
				hidePages.setSwipe(hp.intro, [hp.code,null,null,null]);				
				hs.removeHotSpots(hp.intro, hp.introBack);
				hs.addHotSpot(hp.intro, hp.introBack, function() {hidePages.go(hp.code,"left");});
			} else {
				data.codeError("Please try another code word"); return;
			}
		});


		function addCode() {
			var codeWord = zid("hpMakeCodeWord").value;
			var passWord = zid("hpMakePassWord").value;
			if (codeWord == "") {data.codeError("Please enter a code word"); return;}
			if (passWord == "") {data.codeError("Please enter a password"); return;}
		
			data.addCode(codeWord, passWord);
			app.dataChanged = true;
			// waiter.show();
		}
		
		
		// hp.edit - but sets up the rest of the hp pages as well
		data.on("editResult", function(e) {	
			//waiter.hide();	
			if (data.editResult) {
				//pages.unpause(); // in case it comes from swipe
				hidePages.setSwipe(hp.intro, [hp.edit,null,null,null]);
				hs.removeHotSpots(hp.intro, hp.introBack);
				hs.addHotSpot(hp.intro, hp.introBack, function() {hidePages.go(hp.edit,"left");});
				
				// SET UP HIDE PAGES
				var d = data.hideData;
					
				// hp.pieces				
				hp.setTile(d.tile);
				if (d.spacing) {
					hp.piecesCheckBox.checked = true;
				} else {
					hp.piecesCheckBox.checked = false;
				}
				
				// get images for rest of hide section
				// load pictures
				var hidePicsManifest = [];
				if (d.pic) hidePicsManifest.push({id:"intro", src:d.pic});
				if (d.sponsor1Pic) hidePicsManifest.push({id:"sponsor1", src:d.sponsor1Pic});
				if (d.sponsor2Pic) hidePicsManifest.push({id:"sponsor2", src:d.sponsor2Pic});
				if (d.tilePics) {		
					for (i=1; i<=d.tilePics.length; i++) {
						if (d.tilePics[i-1]) {
							hidePicsManifest.push({id:"tile"+i, src:d.tilePics[i-1]});
						}
					}
				}
								
				// app.hidePicsLoader.reset();
				zog (hidePicsManifest);
				app.hidePicsLoader.loadManifest(hidePicsManifest);
				
				// go to intro once pictures loaded
			
			} else {
				data.codeError("Sorry, incorrect code and pass"); 
			}
		}); 

		app.dataChanged = true;
		function editCode() {
			var codeWord = zid("hpCodeWord").value;
			var passWord = zid("hpPassWord").value;
			if (codeWord == "") {data.codeError("Please enter a code word"); return;}
			if (passWord == "") {data.codeError("Please enter a password"); return;}
					
			// if data changed else just go to intro
			if (app.dataChanged) {
				app.dataChanged = false; // cheating - fix this in final
				data.editCode(codeWord, passWord);
			} else {
				hidePages.go(hp.intro,"right");
			}
		}	
		
		function saveSponsor() {
			zog("save sponsor");
			//data.updateStory(zid("hpStoryTitle").value, zid("hpStoryText").value);
			//hidePages.go(hp.pieces,"right");
		}
		
		function showStory() {
			var d = data.hideData;
			if (d.title) zid("hpStoryTitle").value = d.title;
			if (d.story) zid("hpStoryText").value = d.story;
			hidePages.go(hp.story,"right");	
			
		}
		
		function saveStory() {
			data.updateStory(zid("hpStoryTitle").value, zid("hpStoryText").value);
			hidePages.go(hp.pieces,"right");
		}
		
		function showGame() {
			var d = data.hideData;
			if (d.odds) hp.gameOdds.currentValue = Math.round(d.odds*100) + "%";
			if (d.time) {
				d.time = Number(d.time);
				var t;
				if (d.time <= 60*1000) { 
					t = Math.round(d.time/1000) + " sec";
				} else if (d.time > 60*60*1000) { 
					t = "1 day";
				} else {
					t = (Math.round(d.time/60/1000)) + " min";
				}
				hp.gameTime.currentValue = t;
				zog("setting time to " + t);
			}
			hidePages.go(hp.game,"right");	
			
		}
		
		function saveGame() {
			data.updateGame(hp.gameOdds.currentValue, hp.gameTime.currentValue);
			var d = data.hideData;
			// prepare sponsor data if any
			
			hidePages.go(hp.sponsor,"right");
		}
		
		
		function uploadPiece(e) {
			zog("uploading piece " + e.target.num);
		}
		
		
		// hp.layout -> hp.tile		
		function saveLayout() {
			
			var d = data.hideData;
			
			// update data
			d.tile = hp.currentTile; // the tile arrangement index
			d.arrangement = app.arrLookup[hp.currentTile];
			d.spacing = hp.piecesCheckBox.checked;
			d.numTiles = app.arrNums[hp.currentTile];
			
			data.writeData();
			
			// prepare pic upload tiles
			app.setTiles(d, hp, "X");			
			hp.tiles.cursor = "pointer";

			// apply any saved pictures
			loopTiles();
			
			app.tilesMade = true;
			app.positionTileButtons();
			
			hidePages.go(hp.tile,"right");
		}
		
		// perhaps clearing app.hidePicsLoader properties each time picture is loaded?
		// so would need to store pictures on another object rather than the loader?
		
		function loopTiles() {			
			var d = data.hideData;
			var currentTile;
			if (d.tilePics && d.tilePics.length>0) {		
				for (var i=1; i<=d.numTiles; i++) {	
					if (d.tilePics[i-1]) {	
								
						if (app.hidePicsLoader["tile"+i] && app.hidePicsLoader["tile"+i].getBounds() && app.hidePicsLoader["tile"+i].getBounds().width > 0) {
							currentTile = hp.tiles.getChildAt(i-1);
							if (d.spacing) {
								scale = (app.tileW-10) / app.hidePicsLoader["tile"+i].getBounds().width;
								app.hidePicsLoader["tile"+i].x = app.hidePicsLoader["tile"+i].y = 5;
								currentTile.addChild(app.hidePicsLoader["tile"+i]);
							} else {
								scale = (app.tileW) / app.hidePicsLoader["tile"+i].getBounds().width;
								app.hidePicsLoader["tile"+i].x = app.hidePicsLoader["tile"+i].y = 0;
								currentTile.alpha = .01;
								hp.tilePics.addChild(app.hidePicsLoader["tile"+i]);
								app.hidePicsLoader["tile"+i].x = currentTile.x;
								app.hidePicsLoader["tile"+i].y = currentTile.y;
							}
							zim.scale(app.hidePicsLoader["tile"+i], scale);
							currentTile.removeAllEventListeners();
						}
					}
				}		
			}	
		}
		
		
		// fp.code
		var lastCodeValue = "";
		function checkCode() {
			
			var codeWord = zid("fpCodeWord").value;
			if (codeWord == "") {data.codeError("Please enter a code word"); return;}
			if (codeWord == lastCodeValue) {findPages.go(fp.intro,"right"); return;}
			lastCodeValue = codeWord;
			
			data.on("checkResult", function(e) {	
				
				// waiter.hide(); 
				// does not seem to get triggered if images already cached (even with reset)	
				if (data.checkResult) {
					var d = data.findData;
					
					message.words.text = "Scattering...";
					
					findPages.go(fp.intro,"right");						
					time = false;
							
					// set titles and information 
					for (var i=0; i<fp.titles.length; i++) {				
						fp.titles[i].text = d.title;
						fp.titles[i].parent.setBounds(0,0,fp.titles[i].getBounds().width, fp.titles[i].getBounds().height)
					}
					
					// set story text description
					fp.storyText.text = d.story;
					
					// set tiles
					app.setTiles(d, fp); 
					
					// load pictures
					var findPicsManifest = [{id:"intro", src:d.pic},{id:"sp1", src:d.sponsor1Pic},{id:"sp2", src:d.sponsor2Pic}];
					for (i=1; i<=d.tiles; i++) {
						findPicsManifest.push({id:"tile"+i, src:d.tilePics[i-1]})	
					}
					findPicsLoader.reset();
					findPicsLoader.loadManifest(findPicsManifest);												
					lastCodeValue = codeWord;
				
					layoutManager.resize();
					
				} else {
					data.codeError("Sorry, could not find code word"); return;
				}
			}, null, true); // event gets made each click - so remove the listener after using
		
			data.checkCode(codeWord);
			// waiter.show();

		}		
		
		// fp.look
		function look() {
			
			// if already found them then keep saying found all
			// else if enough time has passed start the clock
			// otherwise show time message
			// if we beat the odds then show found message
			// show a new tile based on shuffled array
			// otherwise show try again message
			// if we have found all then show found all message
			
			var d = data.findData;
			
			if (message.words.text == "Found All!") {
				findPages.go(fp.tile,"left");
				message.pane.show();
				return;
			}
			if (time == false) {
				time = true;
				setInterval(function() {
					time = false;
					if (message.words.text == "Please Wait") message.pane.hide();			
				}, d.time);
			} else {
				message.words.text = "Please Wait";
				message.pane.show();
				return;
			}
			
			if (d.odds < Math.random()) {
				message.words.text = "Try Again!";
			} else {
				if (d.numShowing == d.tiles-1) {
					message.words.text = "Found All!";
				} else {
					message.words.text = "Found One!";
				}
				findPages.go(fp.tile,"left");
				var showTile = d.tileOrder[d.numShowing];
				d.numShowing++;			
				d.numShowing = Math.min(d.numShowing, d.tiles-1);
				
				if (findPicsLoader["tile"+(showTile+1)].getBounds() && findPicsLoader["tile"+(showTile+1)].getBounds().width > 0) {			
					if (d.spacing) {
						fp.tiles.getChildAt(showTile).addChild(findPicsLoader["tile"+(showTile+1)]);
					} else {
						fp.tiles.getChildAt(showTile).alpha = 0;
						fp.tilePics.addChild(findPicsLoader["tile"+(showTile+1)]);
						findPicsLoader["tile"+(showTile+1)].x = fp.tiles.getChildAt(showTile).x;
						findPicsLoader["tile"+(showTile+1)].y = fp.tiles.getChildAt(showTile).y;
					}
					
					stage.update();
				}
			}				
			message.pane.show();			
			
		}
		
	
		
		////////////////////////////////////////////////
		
		// PIC LOADING
		
		// set up queue for loading images specified by database for matching code phrase in Hide section
		var dataPicsPath = data.defaultDataDirectory; 
		app.hidePicsLoader = new cjs.LoadQueue(true, dataPicsPath);
		app.hidePicsLoader.on("complete", hidePicsLoaded);
		app.hidePicsLoader.on("error", hidePicsError);
		var findPicsLoader = new cjs.LoadQueue(true, dataPicsPath); 
		findPicsLoader.on("complete", findPicsLoaded);
		
		var time = false;
		
		function hidePicsError(e) {
			
			zog(e);
			
		}

		function hidePicsLoaded(e) {
			
			zog("doing load");
			
			var d = data.hideData;
			var results = [];
			var scale;	
				
			// create and place intro pic (remove any old pics first)
			if (app.hidePicsLoader.getResult("intro")) {
				zog("doing intro");
				hp.introContent.removeChild(hp.introPic);				
				hp.introPic = new cjs.Bitmap(app.hidePicsLoader.getResult("intro"));
				results = [hp.introPic];
			}
			
			// create and place sponsor pics (remove any old pics first)
			if (app.hidePicsLoader.getResult("sponsor1")) {
				zog("doing sponsor1");
				hp.sponsorPic1.removeAllChildren();				
				hp.sponsorBitmap1 = new cjs.Bitmap(app.hidePicsLoader.getResult("sponsor1"));
				results = [hp.sponsorBitmap1];
			}
			if (app.hidePicsLoader.getResult("sponsor2")) {
				zog("doing sponsor2");
				hp.sponsorPic2.removeAllChildren();				
				hp.sponsorBitmap2 = new cjs.Bitmap(app.hidePicsLoader.getResult("sponsor2"));
				results = [hp.sponsorBitmap2];
			}
			
			/*
			fp.sponsor1Pic = new cjs.Bitmap(findPicsLoader.getResult("sp1"));
			fp.sponsor2Pic = new cjs.Bitmap(findPicsLoader.getResult("sp2"));
			var results = [fp.introPic,fp.sponsor1Pic,fp.sponsor2Pic];
			*/
			
			if (d.tilePics && d.tilePics.length>0) {		
				for (var i=1; i<=d.tilePics.length; i++) {	
					if (app.hidePicsLoader.getResult("tile"+i)) {	
						zog("doing tile");		
						app.hidePicsLoader["tile"+i] = new cjs.Bitmap(app.hidePicsLoader.getResult("tile"+i));
						results.push(app.hidePicsLoader["tile"+i]);
					}
				}
			}
			
			for (var i=0; i<results.length; i++) {			
				if (!results[i].getBounds()) {
					setTimeout(function() {
						hidePicsLoaded(null);
					}, 200);
					zog("trying again");
					return;
				}
			}
			// message.pane.hide();
			// message.words.text = "";
			
			if (app.hidePicsLoader.getResult("intro")) {	
				zog("doing intro 2");
				zim.fit(
					hp.introPic, 0,0, 
					hp.introContent.getBounds().width, 
					hp.introContent.getBounds().height);
				hp.introContent.addChild(hp.introPic);	
			}
			
			zog("looping tiles here:");
			
			loopTiles();
			

			if (app.hidePicsLoader.getResult("sponsor1")) {	
				zog("doing sponsor 1 part 2");
				zim.fit(
					hp.sponsorBitmap1, 0,0, 
					hp.sponsorPic1.getBounds().width, 
					hp.sponsorPic1.getBounds().height);
				hp.sponsorPic1.addChild(hp.sponsorBitmap1);	
			}
			
			if (app.hidePicsLoader.getResult("sponsor2")) {	
				zog("doing sponsor 2 part 2");
				zim.fit(
					hp.sponsorBitmap2, 0,0, 
					hp.sponsorPic2.getBounds().width, 
					hp.sponsorPic2.getBounds().height);
				hp.sponsorPic2.addChild(hp.sponsorBitmap2);	
			}
		
		
			waiter.hide();	
					
			if (hidePages.page == hp.edit) hidePages.go(hp.intro,"right");
			
			stage.update();
			
			//findPages.go(fp.intro,"right");
			//findPages.go(fp.look,"right");
		}
		
		
	
	
		function findPicsLoaded(e) {
			
			var d = data.findData;
					
			// create and place intro pic (remove any old pics first)
			
			fp.introContent.removeChild(fp.introPic);
							
			fp.introPic = new cjs.Bitmap(findPicsLoader.getResult("intro"));	
			fp.sponsor1Pic = new cjs.Bitmap(findPicsLoader.getResult("sp1"));
			fp.sponsor2Pic = new cjs.Bitmap(findPicsLoader.getResult("sp2"));
			var results = [fp.introPic,fp.sponsor1Pic,fp.sponsor2Pic];
			
			for (var i=1; i<=d.tiles; i++) {					
				findPicsLoader["tile"+i] = new cjs.Bitmap(findPicsLoader.getResult("tile"+i));
				results.push(findPicsLoader["tile"+i]);
			}
			
			
			for (var i=0; i<results.length; i++) {			
				if (!results[i].getBounds()) {
					setTimeout(function() {
						findPicsLoaded(null);
					}, 200);
					zog("trying again");
					return;
				}
			}
			
			message.pane.hide();
			message.words.text = "";
					
			zim.fit(
				fp.introPic, 0,0, 
				fp.introContent.getBounds().width, 
				fp.introContent.getBounds().height);
			fp.introContent.addChild(fp.introPic);		
		
			// create the sponsor pics
			// should always be a sponsor as there are default sponsor graphics provided
			
			// remove old sponsor pics
			hs.removeHotSpots(fp.lookBot, fp.sponsor1Pic);
			hs.removeHotSpots(fp.lookBot, fp.sponsor2Pic);
			fp.lookBot.removeChild(fp.sponsor1Pic);
			fp.lookBot.removeChild(fp.sponsor2Pic);
		
			var scale = app.sponsorW/fp.sponsor1Pic.getBounds().width;
			zim.scale(fp.sponsor1Pic, scale);			
			fp.sponsor1Pic.x = app.gutter;
			fp.sponsor1Pic.y = fp.sponsorBacking.y + app.gutter/2;	
			fp.lookBot.addChild(fp.sponsor1Pic);
			hs.addHotSpot(fp.lookBot, fp.sponsor1Pic, function(){zgo(data.sponsor1Url,"sp1");});
								
			scale = app.sponsorW/fp.sponsor2Pic.getBounds().width;
			zim.scale(fp.sponsor2Pic, scale);				
			fp.sponsor2Pic.x = fp.sponsor1Pic.x + app.sponsorW + app.gutter/2;
			fp.sponsor2Pic.y = fp.sponsorBacking.y + app.gutter/2;
			fp.lookBot.addChild(fp.sponsor2Pic);
			hs.addHotSpot(fp.lookBot, fp.sponsor2Pic, function(){zgo(data.sponsor2Url,"sp2");});
				
			// create the tile graphics
			for (var i=1; i<=d.tiles; i++) {					
				//findPicsLoader["tile"+i] = new cjs.Bitmap(findPicsLoader.getItem("tile"+i).src);
				if (findPicsLoader["tile"+i].getBounds() && findPicsLoader["tile"+i].getBounds().width > 0) {
					if (d.spacing) {
						scale = (app.tileW-10) / findPicsLoader["tile"+i].getBounds().width;
						findPicsLoader["tile"+i].x = findPicsLoader["tile"+i].y = 5;
					} else {
						scale = (app.tileW) / findPicsLoader["tile"+i].getBounds().width;
						findPicsLoader["tile"+i].x = findPicsLoader["tile"+i].y = 0;
					}
					zim.scale(findPicsLoader["tile"+i], scale);	
					//zog("hide scale: " + scale);			
				}
			}	
			
			stage.update();
			
			//findPages.go(fp.intro,"right");
			//findPages.go(fp.look,"right");
		}	
	
	
		////////////////////////////////////////////////
		
		// HELPERS	
		
		// wraps a zim.Pane() object and adds a text field
		// makes a pane with text that can be used as an alert window, etc.
		// can add to stage via message.pane.show();
		// can change the text via message.words.text = "message";	
		// (actually added a label to ZIM Pane class but just left this the old way)	
		
		var message = new Message();
		// stage, width, height, label, color, drag, resets, modal, corner, backingAlpha, shadowColor, shadowBlur
		function Message() {		
			//stage, width, height, color, drag, resets, modal, corner, backingAlpha
			this.pane = new zim.Pane(
				overlays,
				overlays.getBounds().width*.7,
				overlays.getBounds().width*.7/3,
				null,"#cccccc",false,false,true,20,.8);
			var alertPic = new cjs.Bitmap(preload.getResult("alert"));
			alertPic.alpha = .8;
			alertPic.regX = alertPic.getBounds().width/2;
			alertPic.regY = alertPic.getBounds().height/2;
			this.pane.addChild(alertPic);
			alertPic.mask = this.pane.display;
			this.pane.display.on("click",function(){this.pane.hide();})
			this.words = new createjs.Text(" ", (overlays.getBounds().width*.1) +"px zebrawood", "#913322");	
			this.words.shadow = new createjs.Shadow("#999999", 3, 3, 10);
			this.words.textAlign = "center";
			this.words.textBaseline = "middle";	
			this.pane.addChild(this.words);	
		}
		
		// handle turning off zil when text is in focus
		var textList = [zid("hpMakeCodeWord"),zid("hpMakePassWord"),zid("hpCodeWord"),zid("hpStoryTitle"),zid("hpStoryText")];	
		for (var i=0; i<textList.length; i++) {
			textList[i].addEventListener("focus", function() {
				window.removeEventListener("keydown", zilEvents[0]);
			});
			textList[i].addEventListener("blur", function() {
				window.addEventListener("keydown", zilEvents[0]);
			});
		}
	
	}
	

	
	return app;
} (app || {});	