	
var app = function(app) {
	
	
	var gutter = 50;
	var sponsorW = 150;
	
	app.fLayouts = function () {
		
		
		// all the find sub pages stored in containers with name properties
		// add any properties we want in the main file to the fp object
		// otherwise keep variables local
				
		var fp = {};		
		fp.titles = [];
		
		var findNextLabel = new zim.Label("NEXT",60,"wildwoodBold","white","white");
		var findInfoLabel = new zim.Label("?",60,"wildwoodBold","white","white");

		
		// find page :: code  ------------------------------------------
		
		fp.code = new cjs.Container(); // code word page	
		fp.code.name = "fpCode";	
				
		fp.codeContent = new cjs.Container();
		fp.code.addChild(fp.codeContent);
		fp.codeContent.setBounds(0,0,640,250);
		var w = fp.codeContent.getBounds().width;
		
		var myText = new cjs.Text("enter\nCODE WORD", "70px wildwoodBold", "white");	
		myText.textAlign = "center";
		myText.textBaseline = "alphabetic";		
		myText.x = w/2; 
		myText.y = 0;
		fp.codeContent.addChild(myText);
			
		
		// add the input field which sits on top of everything
		// addChild will give us some control in cjs like alpha and tweening
		// do not rely on position and scale because the scaled canvas messes it up
		// because if this, would suggest only tweening alpha
		// warning: if you removeChild the field then it shows up again in HTML
		// and unfortunately, even with alpha=0 the cursor shows up
		// so the best way to avoid this is display=none until you need it
		fp.codeWord = new cjs.DOMElement(zid("fpCodeWord"));
		stage.addChild(fp.codeWord);
		fp.codeWord.alpha = 0;
		zss("fpCodeWord").display = "none";
		
		
		// this is a place holder for the input text field
		// the input field gets scaled in the main code resizing functions
		fp.codeWordShape = new createjs.Shape();
		fp.codeWordShape.graphics.f("white").r(88,150,0,0);
		fp.codeWordShape.setBounds(88,150,390,76);		
		fp.codeContent.addChild(fp.codeWordShape);
		                                                 
		fp.codeInfo = new zim.Button(80,80,findInfoLabel,"#812818","#913322","#ddd",4,40,"#812818",20);		
		fp.codeInfo.x = 522; 
		fp.codeInfo.y = 142;
		fp.codeInfo.alpha = .7;
		fp.codeContent.addChild(fp.codeInfo);
		// note, will handle button events in ZIM HotSpots
		
		var codeBot = new createjs.Container();
		w = 500;
		var h = 110
		codeBot.setBounds(0,0,w,h);
		fp.code.addChild(codeBot);
		
		// fp.codeBack = makeBackButton(0, (h-80)/2);	
		// codeBot.addChild(hp.codeBack);
															
		fp.codeNext = new zim.Button(230,110,findNextLabel,"#812818","#913322","#ddd",4,30,"#812818",20);		
		fp.codeNext.x = (w-fp.codeNext.width)/2; 
		fp.codeNext.y = 0; 
		codeBot.addChild(fp.codeNext);		

		layoutManager.add(new zim.Layout(fp.code, 
			[{object:fp.codeContent, marginTop:35, height:35, maxWidth:100, align:"middle", valign:"middle"},
			{object:codeBot, marginTop:5, maxWidth:75, height:10, align:"middle", valign:"bottom"}],
		5, null, true, new createjs.Shape(), stage));	
		
		
		
		// find page :: intro ------------------------------------------
		
		fp.intro = new cjs.Container(); // intro page
		fp.intro.name = "fpIntro";
		
		// intro pic goes in here from the load event at the bottom
	
		fp.introContent = new cjs.Container();
		fp.intro.addChild(fp.introContent);
		fp.introContent.setBounds(0,0,640,640);
		var w = fp.introContent.getBounds().width;

		
		var introBot = new createjs.Container();
		w = 500;
		var h = 110
		introBot.setBounds(0,0,w,h);
		fp.intro.addChild(introBot);
		
		fp.introBack = makeBackButton(0, (h-80)/2);	
		introBot.addChild(fp.introBack);
		
		fp.introNext = new zim.Button(230,110,findNextLabel.clone(),"#812818","#913322","#ddd",4,30,"#812818",20);	
		fp.introNext.x = (w-fp.introNext.width)/2; 
		fp.introNext.y = 0; 
		introBot.addChild(fp.introNext);		

		layoutManager.add(new zim.Layout(fp.intro, 
			[{object:fp.introContent, marginTop:20, height:62, maxWidth:100, align:"middle", valign:"middle"},
			{object:introBot, marginTop:3, maxWidth:75, height:10, align:"middle", valign:"bottom"}],
		5, null, true, new createjs.Shape(), stage));		
		
		
		// find page :: story ------------------------------------------
		
		fp.story = new cjs.Container(); // intro page
		fp.story.name = "fpStory";	
		
		var storyTop = new createjs.Container();
		fp.story.addChild(storyTop);
		storyTop.setBounds(0,0,stageW,stageH*.08);
		
		var storyTitle = new cjs.Text("", "40px wildwood", "white"); 
		fp.titles.push(storyTitle);
		storyTitle.textBaseline = "bottom";
		storyTitle.textAlign = "left";	
		storyTitle.y = 45; 
		storyTitle.shadow = new cjs.Shadow("black", 3, 3, 10);
		storyTop.addChild(storyTitle);
	
		
		fp.storyContent = new cjs.Container();
		fp.story.addChild(fp.storyContent);
		fp.storyContent.setBounds(0,0,640,640);
		var w = fp.storyContent.getBounds().width;

		var storyBacking = new cjs.Shape();
		storyBacking.graphics.f("black").ss(1).s("white").rr(0,0,w,w,30);
		storyBacking.alpha = .5;
		fp.storyContent.addChild(storyBacking);

		fp.storyText = new cjs.Text("", "34px wildwood", "white"); 
		var newWidth = w-gutter*2;
		fp.storyText.lineWidth = newWidth; // from above page
		fp.storyText.textBaseline = "top";
		fp.storyText.textAlign = "left";
		fp.storyText.alpha = .85;
		fp.storyText.x = gutter; 
		fp.storyText.y = gutter; 
		fp.storyContent.addChild(fp.storyText);
		

		var storyBot = new createjs.Container();
		w = 500;
		var h = 110
		storyBot.setBounds(0,0,w,h);
		fp.story.addChild(storyBot);
		
		fp.storyBack = makeBackButton(0, (h-80)/2);	
		storyBot.addChild(fp.storyBack);
		
		fp.storyNext = new zim.Button(230,110,findNextLabel.clone(),"#812818","#913322","#ddd",4,30,"#812818",20);	
		fp.storyNext.x = (w-fp.storyNext.width)/2; 
		fp.storyNext.y = 0; 
		storyBot.addChild(fp.storyNext);		


		 
		
		layoutManager.add(new zim.Layout(fp.story, 
		    [{object:storyTop, marginTop:20, maxWidth:90, height:8, align:"middle", valign:"top"},
			{object:fp.storyContent, marginTop:3, maxWidth:90, align:"middle", valign:"middle"},
			{object:storyBot, marginTop:3, maxWidth:75, height:10, align:"middle", valign:"bottom"}],
		5, null, true, new createjs.Shape(), stage));		
	
		
		
		
		// tile page :: tile ------------------------------------------
		
		fp.tile = new cjs.Container(); // intro page
		fp.tile.name = "fpTile";
		
		var tileTop = new createjs.Container();
		fp.tile.addChild(tileTop);
		tileTop.setBounds(0,0,stageW,stageH*.08);
		
		var tileTitle = new cjs.Text("", "40px wildwood", "white"); 
		fp.titles.push(tileTitle);
		tileTitle.textBaseline = "bottom";
		tileTitle.textAlign = "left";	
		tileTitle.y = 45; 
		tileTitle.shadow = new cjs.Shadow("black", 3, 3, 10);
		tileTop.addChild(tileTitle);
	
		
		fp.tileContent = new cjs.Container();
		fp.tile.addChild(fp.tileContent);
		fp.tileContent.setBounds(0,0,640,640);
		var w = fp.tileContent.getBounds().width;
		
		fp.tileBacking = new cjs.Shape();
		fp.tileBacking.graphics.f("black").ss(1).s("white").rr(0,0,w,w,30);
		fp.tileBacking.alpha = .5;
		fp.tileBacking.setBounds(0,0,w,w)
		fp.tileContent.addChild(fp.tileBacking);
		
		fp.tilePics = new cjs.Container(); // will fill with tiles from data later
		fp.tiles = new cjs.Container(); 
		
		// tiles come from controller getting data from data
		
		
		var tileBot = new createjs.Container();
		w = 500;
		var h = 110
		tileBot.setBounds(0,0,w,h);
		fp.tile.addChild(tileBot);
		
		fp.tileBack = makeBackButton(0, (h-80)/2);	
		tileBot.addChild(fp.tileBack);
		
		var findTileLabel = new zim.Label("FIND",60,"wildwoodBold","white","white");
		fp.tileFind = new zim.Button(230,110,findTileLabel,"#812818","#913322","#ddd",4,30,"#812818",20);	
		fp.tileFind.x = (w-fp.tileFind.width)/2; 
		fp.tileFind.y = 0; 
		tileBot.addChild(fp.tileFind);		

		layoutManager.add(new zim.Layout(fp.tile, 
		    [{object:tileTop, marginTop:20, maxWidth:90, height:8, align:"middle", valign:"top"},
			{object:fp.tileContent, marginTop:3, maxWidth:90, align:"middle", valign:"middle"},
			{object:tileBot, marginTop:3, maxWidth:75, height:10, align:"middle", valign:"bottom"}],
		5, null, true, new createjs.Shape(), stage));

		
		
		// find page :: look ------------------------------------------
		
		fp.look = new cjs.Container(); // intro page
		fp.look.name = "fpLook";
		
		var lookTop = new createjs.Container();
		fp.look.addChild(lookTop);
		lookTop.setBounds(0,0,stageW,stageH*.08);
		
		var lookTitle = new cjs.Text("", "40px wildwood", "white"); 
		fp.titles.push(lookTitle);
		lookTitle.textBaseline = "bottom";
		lookTitle.textAlign = "left";	
		lookTitle.y = 45; 
		lookTitle.shadow = new cjs.Shadow("black", 3, 3, 10);
		lookTop.addChild(lookTitle);
	
		
		fp.lookContent = new cjs.Container();
		fp.look.addChild(fp.lookContent);
		fp.lookContent.setBounds(0,0,400,400);
		var w = fp.lookContent.getBounds().width;
		
		var findLookLabel = new zim.Label("LOOK",100,"wildwoodBold","white","white");		
		fp.lookButton = new zim.Button(w,w,findLookLabel,"#812818","#913322","#ddd",6,200,"#812818",40);		
		fp.lookContent.addChild(fp.lookButton);		
				

		var lookBot = fp.lookBot = new createjs.Container();
		var w = sponsorW*3+gutter*2;
		var h = sponsorW+gutter;
		lookBot.setBounds(0,0,w,h);
		fp.look.addChild(lookBot);
		

		fp.sponsorBacking = new cjs.Shape();
		fp.sponsorBacking.graphics.f("black").ss(1).s("white").rr(0,0,w,h,30);
		fp.sponsorBacking.alpha = .5;
		fp.sponsorBacking.setBounds(0,0,stageW-gutter, sponsorW+gutter); 		
		lookBot.addChild(fp.sponsorBacking);	
		
		// put sponsor images here once they load at bottom
				
		var theText = "Please\nvisit our\nSponsors"; 
		var sponsorText = new cjs.Text(theText, "30px wildwood", "white"); 
		sponsorText.textBaseline = "top";
		sponsorText.textAlign = "left";
		sponsorText.alpha = .85;
		sponsorText.x = 2 * (gutter + sponsorW);
		
		lookBot.addChild(sponsorText);
		sponsorText.y = 50;
		
		layoutManager.add(new zim.Layout(fp.look, 
		    [{object:lookTop, marginTop:20, maxWidth:90, height:8, align:"middle", valign:"top"},
			{object:fp.lookContent, marginTop:5, maxWidth:90, align:"middle", valign:"middle"},
			{object:lookBot, marginTop:5, maxWidth:90, height:20, align:"middle", valign:"bottom"}],
		5, null, true, new createjs.Shape(), stage));

		function makeBackButton(xPos, yPos) {
			var bbLabel = new zim.Label("",60,"wildwoodBold","white","white");		
			var bb = new zim.Button(80,80,bbLabel,"#812818","#913322","#ddd",4,40,"#812818",20);		
			bb.x = xPos; 
			bb.y = yPos;
			bb.alpha = .7;					
			var bt = new zim.Triangle(46,44,44,"white",null,null,true,5);			
			bt.rotation = -90;
			bt.alpha = .6;
			bt.x = bb.width/2;
			bt.y = bb.height/2;
			bt.mouseChildren = false;
			bt.mouseEnabled = false;
			bb.addChild(bt);				
			return bb;			
		}		
		
		return fp;
		
	
	}
		
	return app;
} (app || {});		