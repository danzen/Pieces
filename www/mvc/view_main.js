	
var app = function(app) {
	
	app.mLayouts = function () {
		
		// all the page layouts are stored in containers with name properties
		// add any properties we want in the main file to the p object
		// otherwise keep variables local
		
		var mp = {};
		
		// -------------  home page  ---------------
		
		mp.home = new cjs.Container();	
		mp.home.name = "home";
		var homeContainer = mp.home.container = new cjs.Container();
		mp.home.addChild(homeContainer);	
		var homePic = new cjs.Bitmap(preload.getResult("home"));
		homeContainer.addChild(homePic);	
		homeContainer.regX = homeContainer.getBounds().width/2;
		backings.push(homeContainer);	
			
		zog (homeContainer.getBounds().width/2);
		
		// preload fonts by calling them on first page
		// these will not be needed until later as first page is only an image
		
		var preloadText1 = new cjs.Text("1", "30px wildwood", "orange");
		mp.home.addChild(preloadText1);
		preloadText1.alpha = .01;
		preloadText1.x = 630;
		preloadText1.y = 950;
		
		var preloadText2 = new cjs.Text("0", "30px wildwoodBold", "orange");
		mp.home.addChild(preloadText2);
		preloadText2.alpha = .01;
		preloadText2.x = 635;
		preloadText2.y = 950;
		
		var preloadText3 = new cjs.Text("0", "30px zebrawood", "orange");
		mp.home.addChild(preloadText3);
		preloadText3.alpha = .01;
		preloadText3.x = 635;
		preloadText3.y = 950;	
		
		// -------------  hide page  ---------------
		// this acts as backing for the real hide pages
		
		mp.hide = new cjs.Container();
		mp.hide.name = "hide";
		var hideContainer = mp.hide.container = new cjs.Container();
		mp.hide.addChild(hideContainer);
		var hidePic = new cjs.Bitmap(preload.getResult("hide"));
		hideContainer.addChild(hidePic);
		hideContainer.regX = hideContainer.getBounds().width/2;
		backings.push(hideContainer);
	
		// -------------  find page  ---------------
		// this acts as backing for the real find pages
		
		mp.find = new cjs.Container();
		mp.find.name = "find";
		var findContainer = mp.find.container = new cjs.Container();
		mp.find.addChild(findContainer);
		var findPic = new cjs.Bitmap(preload.getResult("find"));		
		findContainer.addChild(findPic);
		findContainer.regX = findContainer.getBounds().width/2;
		backings.push(findContainer);	
		
		return mp;
		
	}
	
	return app;
} (app || {});		