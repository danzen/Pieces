	
var app = function(app) {
	

	app.hLayouts = function () {

		// all the page layouts are stored in containers with name properties
		// add any properties we want in the main file to the p object
		// otherwise keep variables local
		
		var hp = {};	
		
		var hideNextLabel = new zim.Label("NEXT",60,"wildwoodBold","white","white");
		var hideSaveLabel = new zim.Label("SAVE",60,"wildwoodBold","white","white");
		
		// hide page :: first  ------------------------------------------
		
		hp.first = new cjs.Container(); // code word page
		hp.first.name = "hpFirst";
					
		var firstTop = new createjs.Container();
		hp.first.addChild(firstTop);
		
		// would recommend always adding content to a container
		// for using the layout - makes it easier to conceptualize positioning
		var firstTitle = new createjs.Text("HIDE PIECES", "70px wildwoodBold", "#913322");	
		firstTitle.textAlign = "left";
		firstTitle.textBaseline = "alphabetic";	
		firstTitle.y = 50; // uppercase height	
		firstTitle.shadow = new createjs.Shadow("#999999", 3, 3, 10);	
		firstTop.addChild(firstTitle);				

		var firstContent = new createjs.Container();
		firstContent.setBounds(0,0,400,400);
		hp.first.addChild(firstContent);
		
		// labelText, fontSize, font, textColor, textRollColor, shadowColor, shadowBlur
		var firstNewLabel = new zim.Label("NEW",60,"wildwoodBold","white","white");
		// width, height, label, 
		// backingColor, backingRollColor, borderColor, borderThickness,
		// corner, shadowColor, shadowBlur		
		hp.firstNew = new zim.Button(230,110,firstNewLabel,"#918100","#ac9900","#ddd",4,30,"#776a00",20);		
		firstContent.addChild(hp.firstNew);		
				
		var firstTextH = new createjs.Container();
		firstContent.addChild(firstTextH);			
		var firstText = new createjs.Text("create new hunt\n or edit existing", "70px wildwoodBold", "white");	
		firstText.textAlign = "left";
		firstText.textBaseline = "alphabetic";
		firstText.y = 60; // lowercase height
		firstText.shadow = new createjs.Shadow("#999999", 3, 3, 10);		
		firstTextH.addChild(firstText);		
		
		var firstEditLabel = new zim.Label("EDIT",60,"wildwoodBold","white","white");
		hp.firstEdit = new zim.Button(230,110,firstEditLabel,"#918100","#ac9900","#ddd",4,30,"#776a00",20);		
		hp.firstEdit.y = 200;
		firstContent.addChild(hp.firstEdit);
				
		// gridManager.add(new zim.Grid(firstContent, "black", false));
		
	
	
		// holder, region1, region2, region3, lastMargin, backgroundColor, vertical, regionShape, scalingObject		
		layoutManager.add(new zim.Layout(hp.first, 
			[{object:firstTop, marginTop:8, maxWidth:100, height:8, align:"middle", valign:"top"}, 
			{object:firstContent, marginTop:9, height:50, maxWidth:90, align:"middle", valign:"middle"}],
		25, null, true, new createjs.Shape(), stage));


		layoutManager.add(new zim.Layout(firstContent,
			[{object:hp.firstNew, maxWidth:50, minHeight:30, align:"left"}, 
			{object:firstTextH, maxWidth:100, marginTop:5, valign:"top"},
			{object:hp.firstEdit, maxWidth:50, marginTop:5, minHeight:30, valign:"top"}], 
		0, null, true, new createjs.Shape()));	
	
		
		
		
		
		// zim.outline(firstContent, new createjs.Shape());
				
		/*
		// custom-font bounding box is quite different in different browsers
		// this means could not use centered text - only left aligned
		zim.outline(firstTextH, new createjs.Shape());		
		*/
		
		// hide page :: code  ------------------------------------------
		
		hp.code = new cjs.Container(); // code word page	
		hp.code.name = "hpCode";	
	
		var codeTop = new createjs.Container();
		hp.code.addChild(codeTop);
		
		var codeTitle = new createjs.Text("HIDE PIECES", "70px wildwoodBold", "#913322");	
		codeTitle.textAlign = "left";
		codeTitle.textBaseline = "alphabetic";	
		codeTitle.shadow = new createjs.Shadow("#999999", 3, 3, 10);
		codeTitle.y = 50;
		codeTop.addChild(codeTitle);
	
		hp.codeContent = new createjs.Container();
		hp.code.addChild(hp.codeContent);
		hp.codeContent.setBounds(0,0,640,400);
		var w = hp.codeContent.getBounds().width;
		
		var codeText = new createjs.Text("make code word", "60px wildwoodBold", "white");	
		codeText.textAlign = "center";
		codeText.textBaseline = "alphabetic";	
		codeText.shadow = new createjs.Shadow("#999999", 3, 3, 10);	
		codeText.x = w/2; 
		codeText.y = 0;
		hp.codeContent.addChild(codeText);
		
		var codeText2 = new createjs.Text("for hunters", "60px wildwoodBold", "white");	
		codeText2.textAlign = "center";
		codeText2.textBaseline = "alphabetic";		
		codeText2.shadow = new createjs.Shadow("#999999", 3, 3, 10);
		codeText2.x = w/2; 
		codeText2.y = 52;
		hp.codeContent.addChild(codeText2);
		
		var codeText3 = new createjs.Text("and your password", "60px wildwoodBold", "white");	
		codeText3.textAlign = "center";
		codeText3.textBaseline = "alphabetic";		
		codeText3.shadow = new createjs.Shadow("#999999", 3, 3, 10);
		codeText3.x = w/2; 
		codeText3.y = 250;
		hp.codeContent.addChild(codeText3);
				
		// add the input field which sits on top of everything
		// addChild will give us some c ontrol in createJS like alpha and tweening
		// do not rely on position and scale because the scaled canvas messes it up
		// because if this, would suggest only tweening alpha
		// warning: if you removeChild the field then it shows up again in HTML
		// and unfortunately, even with alpha=0 the cursor shows up
		// so the best way to avoid this is display=none until you need it
		hp.codeWord = new cjs.DOMElement(zid("hpMakeCodeWord"));
		stage.addChild(hp.codeWord);
		// hp.codeWord.alpha = 0;
		zss("hpMakeCodeWord").display = "none";
		
		hp.codePass = new cjs.DOMElement(zid("hpMakePassWord"));
		stage.addChild(hp.codePass);
		// hp.codePass.alpha = 0;
		zss("hpMakePassWord").display = "none"; 
		
		// these are place holders for the input text fields 
		// the input fields get scaled in the main code resizing functions
		hp.codeWordShape = new createjs.Shape();
		hp.codeWordShape.graphics.f("white").r(88,100,0,0);
		hp.codeWordShape.setBounds(88,100,390,76);		
		hp.codeContent.addChild(hp.codeWordShape);
		
		hp.codePassShape = new createjs.Shape();
		hp.codePassShape.graphics.f("white").r(88,298,0,0);
		hp.codePassShape.setBounds(88,298,390,76);		
		hp.codeContent.addChild(hp.codePassShape);
		
		// gridManager.add(new zim.Grid(hp.codeContent, "black", false));
		
		// note, will handle button events in ZIM HotSpot
		
		var codeInfoLabel = new zim.Label("?",60,"wildwoodBold","white","white");
		hp.codeInfo = new zim.Button(80,80,codeInfoLabel,"#918100","#ac9900","#ddd",4,40,"#776a00",20);		
		hp.codeInfo.x = 522; 
		hp.codeInfo.y = 92;
		hp.codeInfo.alpha = .7;
		hp.codeContent.addChild(hp.codeInfo);

		hp.codeInfo2 = new zim.Button(80,80,codeInfoLabel.clone(),"#918100","#ac9900","#ddd",4,40,"#776a00",20);		
		hp.codeInfo2.x = 522; 
		hp.codeInfo2.y = 291;
		hp.codeInfo2.alpha = .7;
		hp.codeContent.addChild(hp.codeInfo2);	

		
		var codeBot = new createjs.Container();
		w = 500;
		h = 110
		codeBot.setBounds(0,0,w,h);
		hp.code.addChild(codeBot);
		
		hp.codeBack = makeBackButton(0, (h-80)/2);	
		codeBot.addChild(hp.codeBack);
		
		hp.codeNext = new zim.Button(230,110,hideNextLabel.clone(),"#918100","#ac9900","#ddd",4,30,"#776a00",20);		
		hp.codeNext.x = (w-hp.codeNext.width)/2; 
		hp.codeNext.y = 0; 
		codeBot.addChild(hp.codeNext);	
		
		layoutManager.add(new zim.Layout(hp.code, 
			[{object:codeTop, marginTop:8, maxWidth:100, height:8, align:"middle", valign:"top"}, 
			{object:hp.codeContent, marginTop:10, maxWidth:100, align:"middle", valign:"middle"},
			{object:codeBot, marginTop:5, maxWidth:75, height:10, align:"middle", valign:"bottom"}],
		20, null, true, new createjs.Shape(), stage));		

		
		
		
	
		// hide page :: edit  ------------------------------------------
		
		hp.edit = new cjs.Container(); // edit word page	
		hp.edit.name = "hpEdit";	
	
		var editTop = new createjs.Container();
		hp.edit.addChild(editTop);
		
		var editTitle = new createjs.Text("HIDE PIECES", "70px wildwoodBold", "#913322");	
		editTitle.textAlign = "left";
		editTitle.textBaseline = "alphabetic";	
		editTitle.shadow = new createjs.Shadow("#999999", 3, 3, 10);
		editTitle.y = 50;
		editTop.addChild(editTitle);		
				
		hp.editContent = new createjs.Container();
		hp.edit.addChild(hp.editContent);
		hp.editContent.setBounds(0,0,640,400);
		var w = hp.editContent.getBounds().width;
		
		var editText = new createjs.Text("enter existing", "60px wildwoodBold", "white");	
		editText.textAlign = "center";
		editText.textBaseline = "alphabetic";	
		editText.shadow = new createjs.Shadow("#999999", 3, 3, 10);	
		editText.x = w/2; 
		editText.y = 0;
		hp.editContent.addChild(editText);
		
		var editText2 = new createjs.Text("code word", "60px wildwoodBold", "white");	
		editText2.textAlign = "center";
		editText2.textBaseline = "alphabetic";		
		editText2.shadow = new createjs.Shadow("#999999", 3, 3, 10);
		editText2.x = w/2; 
		editText2.y = 52;
		hp.editContent.addChild(editText2);
		
		var editText3 = new createjs.Text("and your password", "60px wildwoodBold", "white");	
		editText3.textAlign = "center";
		editText3.textBaseline = "alphabetic";		
		editText3.shadow = new createjs.Shadow("#999999", 3, 3, 10);
		editText3.x = w/2; 
		editText3.y = 250;
		hp.editContent.addChild(editText3);
				
		// add the input field which sits on top of everything
		// addChild will give us some control in createJS like alpha and tweening
		// do not rely on position and scale because the scaled content messes it up
		// because if this, would suggest only tweening alpha
		// warning: if you removeChild the field then it shows up again in HTML
		// and unfortunately, even with alpha=0 the cursor shows up
		// so the best way to avoid this is display=none until you need it
		
		hp.editWord = new cjs.DOMElement(zid("hpCodeWord"));
		stage.addChild(hp.editWord);
		//hp.editWord.alpha = 0;
		zss("hpCodeWord").display = "none"; 
		
		hp.editPass = new cjs.DOMElement(zid("hpPassWord"));
		stage.addChild(hp.editPass);
		//hp.editPass.alpha = 0;
		zss("hpPassWord").display = "none";		
		
		// these are place holders for the input text fields 
		// the input fields get scaled in the main code resizing functions
		hp.editWordShape = new createjs.Shape();
		hp.editWordShape.graphics.f("white").r(88,100,0,0);
		hp.editWordShape.setBounds(88,100,390,76);		
		hp.editContent.addChild(hp.editWordShape);
		
		hp.editPassShape = new createjs.Shape();
		hp.editPassShape.graphics.f("white").r(88,298,0,0);
		hp.editPassShape.setBounds(88,298,390,76);		
		hp.editContent.addChild(hp.editPassShape);
		
		// gridManager.add(new zim.Grid(hp.editContent, "black", false));
						
		// note, will handle button events in ZIM HotSpots
		
		var editInfoLabel = new zim.Label("?",60,"wildwoodBold","white","white");
		hp.editInfo = new zim.Button(80,80,editInfoLabel,"#918100","#ac9900","#ddd",4,40,"#776a00",20);		
		hp.editInfo.x = 522; 
		hp.editInfo.y = 92;
		hp.editInfo.alpha = .7;
		hp.editContent.addChild(hp.editInfo);

		hp.editInfo2 = new zim.Button(80,80,editInfoLabel.clone(),"#918100","#ac9900","#ddd",4,40,"#776a00",20);		
		hp.editInfo2.x = 522; 
		hp.editInfo2.y = 291;
		hp.editInfo2.alpha = .7;
		hp.editContent.addChild(hp.editInfo2);	
		
		var editBot = new createjs.Container();
		w = 500;
		h = 110
		editBot.setBounds(0,0,w,h);
		hp.edit.addChild(editBot);
		
		hp.editBack = makeBackButton(0, (h-80)/2);	
		editBot.addChild(hp.editBack);
		
		hp.editNext = new zim.Button(230,110,hideNextLabel.clone(),"#918100","#ac9900","#ddd",4,30,"#776a00",20);		
		hp.editNext.x = (w-hp.editNext.width)/2; 
		hp.editNext.y = 0;
		editBot.addChild(hp.editNext);	
		
		layoutManager.add(new zim.Layout(hp.edit, 
			[{object:editTop, marginTop:8, maxWidth:100, height:8, align:"middle", valign:"top"}, 
			{object:hp.editContent, marginTop:10, maxWidth:100, align:"middle", valign:"middle"},
			{object:editBot, marginTop:5, maxWidth:75, height:10, align:"middle", valign:"bottom"}],
		20, null, true, new createjs.Shape(), stage));		

		
		
		// hide page :: intro  ------------------------------------------
		
		hp.intro = new cjs.Container(); // code word page	
		hp.intro.name = "hpIntro";
		
		var introTop = new createjs.Container();
		hp.intro.addChild(introTop);
		
		var introTitle = new createjs.Text("INTRO", "70px wildwoodBold", "#913322");	
		introTitle.textAlign = "left";
		introTitle.textBaseline = "alphabetic";	
		introTitle.shadow = new createjs.Shadow("#999999", 3, 3, 10);
		introTitle.y = 50;
		introTop.addChild(introTitle);
	
		hp.introContent = new createjs.Container();
		hp.intro.addChild(hp.introContent);
		hp.introContent.setBounds(0,0,640,640);
		var w = hp.introContent.getBounds().width;

		var introText = new createjs.Text("upload intro picture", "60px wildwoodBold", "white");	
		introText.textAlign = "center";
		introText.textBaseline = "alphabetic";	
		introText.shadow = new createjs.Shadow("#999999", 3, 3, 10);	
		introText.x = w/2; 
		introText.y = 100;
		hp.introContent.addChild(introText);
		
		var introText2 = new createjs.Text("at least 600x600 px", "60px wildwoodBold", "white");	
		introText2.textAlign = "center";
		introText2.textBaseline = "alphabetic";	
		introText2.shadow = new createjs.Shadow("#999999", 3, 3, 10);	
		introText2.x = w/2; 
		introText2.y = 180;
		hp.introContent.addChild(introText2);

		hp.introTile = app.drawTile("X");
		hp.introTile.cursor = "pointer";
		hp.introTile.mouseChildren = false;
		hp.introTile.shadow = new createjs.Shadow("#333333", 3, 3, 10);
		var introTileScale = .8;
		hp.introTile.x = (w-hp.introTile.getBounds().width*introTileScale)/2; 
		hp.introTile.y = 240;
		zim.scale(hp.introTile,introTileScale);
		hp.introContent.addChild(hp.introTile);
		
		hp.introUploadBut = new cjs.DOMElement(zid("hpIntroUpload"));
		stage.addChild(hp.introUploadBut);
		hp.introUploadBut.alpha = 0;
		zss("hpIntroUpload").display = "none";
		
		var introText3 = new createjs.Text("story text is next", "60px wildwoodBold", "#913322");	
		introText3.textAlign = "center";
		introText3.textBaseline = "alphabetic";	
		introText3.shadow = new createjs.Shadow("#999999", 3, 3, 10);	
		introText3.x = w/2; 
		introText3.y = 580;
		hp.introContent.addChild(introText3);

		hp.introPic = new cjs.Container(); // will fill with intros from data later
		hp.introContent.addChild(hp.introPic);
		
		// intros come from controller getting data from data
		
		var introBot = new createjs.Container();
		w = 500;
		h = 110
		introBot.setBounds(0,0,w,h);
		hp.intro.addChild(introBot);
		//new zim.Grid(introBot,null,false);
		
		hp.introBack = makeBackButton(0, (h-80)/2);	
		introBot.addChild(hp.introBack);
		
		hp.introNext = new zim.Button(230,110,hideNextLabel.clone(),"#918100","#ac9900","#ddd",4,30,"#776a00",20);		
		hp.introNext.x = (w-hp.introNext.width)/2; 
		hp.introNext.y = 0;
		introBot.addChild(hp.introNext);			
		

		layoutManager.add(new zim.Layout(hp.intro, 
			[{object:introTop, marginTop:8, maxWidth:100, height:8, align:"middle", valign:"top"}, 
			{object:hp.introContent, backgroundColor:"rgba(0,0,0,.1)", marginTop:3, maxWidth:100, align:"middle", valign:"top"},
			{object:introBot, marginTop:3, maxWidth:75, height:10, align:"middle", valign:"bottom"}],
		20, null, true, new createjs.Shape(), stage));
		
		
		
		// hide page :: story (and Title)  -------------------------------
		
		
		hp.story = new cjs.Container(); // story word page	
		hp.story.name = "hpStory";	
	
		var storyTop = new createjs.Container();
		hp.story.addChild(storyTop);
		
		var storyTitle = new createjs.Text("STORY", "70px wildwoodBold", "#913322");	
		storyTitle.textAlign = "left";
		storyTitle.textBaseline = "alphabetic";	
		storyTitle.shadow = new createjs.Shadow("#999999", 3, 3, 10);
		storyTitle.y = 50;
		storyTop.addChild(storyTitle);		
				
		hp.storyContent = new createjs.Container();
		hp.story.addChild(hp.storyContent);
		hp.storyContent.setBounds(0,0,640,450);
		var w = hp.storyContent.getBounds().width;
		
		var storyText = new createjs.Text("enter title", "60px wildwoodBold", "white");	
		storyText.textAlign = "center";
		storyText.textBaseline = "alphabetic";	
		storyText.shadow = new createjs.Shadow("#999999", 3, 3, 10);	
		storyText.x = w/2; 
		storyText.y = 0;
		hp.storyContent.addChild(storyText);
		
		
		var storyText2 = new createjs.Text("enter story", "60px wildwoodBold", "white");	
		storyText2.textAlign = "center";
		storyText2.textBaseline = "alphabetic";		
		storyText2.shadow = new createjs.Shadow("#999999", 3, 3, 10);
		storyText2.x = w/2; 
		storyText2.y = 180;
		hp.storyContent.addChild(storyText2);
				
		// add the input field which sits on top of everything
		// addChild will give us some control in createJS like alpha and tweening
		// do not rely on position and scale because the scaled content messes it up
		// because if this, would suggest only tweening alpha
		// warning: if you removeChild the field then it shows up again in HTML
		// and unfortunately, even with alpha=0 the cursor shows up
		// so the best way to avoid this is display=none until you need it
		
		hp.storyTitle = new cjs.DOMElement(zid("hpStoryTitle"));
		stage.addChild(hp.storyTitle);
		//hp.storyTitle.alpha = 0;
		zss("hpStoryTitle").display = "none"; 
		
		hp.storyText = new cjs.DOMElement(zid("hpStoryText"));
		stage.addChild(hp.storyText);
		//hp.storyText.alpha = 0;
		zss("hpStoryText").display = "none";		
		
		// these are place holders for the input text fields 
		// the input fields get scaled in the main code resizing functions
		hp.storyTitleShape = new createjs.Shape();
		hp.storyTitleShape.graphics.f("white").r(88,30,0,0);
		hp.storyTitleShape.setBounds(88,30,450,76);		
		hp.storyContent.addChild(hp.storyTitleShape);
		
		hp.storyTextShape = new createjs.Shape();
		hp.storyTextShape.graphics.f("white").r(88,208,0,0);
		hp.storyTextShape.setBounds(88,208,450,196);		
		hp.storyContent.addChild(hp.storyTextShape);
		
		// gridManager.add(new zim.Grid(hp.storyContent, "black", false));
						
		// note, will handle button events in ZIM HotSpots
		
		/*
		var storyInfoLabel = new zim.Label("?",60,"wildwoodBold","white","white");
		hp.storyInfo = new zim.Button(80,80,storyInfoLabel,"#918100","#ac9900","#ddd",4,40,"#776a00",20);		
		hp.storyInfo.x = 522; 
		hp.storyInfo.y = 23;
		hp.storyInfo.alpha = .7;
		hp.storyContent.addChild(hp.storyInfo);

		hp.storyInfo2 = new zim.Button(80,80,storyInfoLabel.clone(),"#918100","#ac9900","#ddd",4,40,"#776a00",20);		
		hp.storyInfo2.x = 522; 
		hp.storyInfo2.y = 210;
		hp.storyInfo2.alpha = .7;
		hp.storyContent.addChild(hp.storyInfo2);	
		*/
		
		var storyBot = new createjs.Container();
		w = 500;
		h = 110
		storyBot.setBounds(0,0,w,h);
		hp.story.addChild(storyBot);
		
		hp.storyBack = makeBackButton(0, (h-80)/2);	
		storyBot.addChild(hp.storyBack);
		
		hp.storySave = new zim.Button(230,110,hideSaveLabel.clone(),"#918100","#ac9900","#ddd",4,30,"#776a00",20);		
		hp.storySave.x = (w-hp.storySave.width)/2; 
		hp.storySave.y = 0;
		storyBot.addChild(hp.storySave);	
		
		layoutManager.add(new zim.Layout(hp.story, 
			[{object:storyTop, marginTop:8, maxWidth:100, height:8, align:"middle", valign:"top"}, 
			{object:hp.storyContent, marginTop:8, maxWidth:100, align:"middle", valign:"middle"},
			{object:storyBot, marginTop:5, maxWidth:75, height:10, align:"middle", valign:"bottom"}],
		20, null, true, new createjs.Shape(), stage));		

		// new zim.Grid(hp.storyContent); 		
		// zim.outline(hp.storyContent);
		
		// hide page :: pieces  ------------------------------------------
		
		hp.pieces = new cjs.Container(); // code word page	
		hp.pieces.name = "hpPieces";
		
		var piecesTop = new createjs.Container();
		hp.pieces.addChild(piecesTop);
		
		var piecesTitle = new createjs.Text("LAYOUT", "70px wildwoodBold", "#913322");	
		piecesTitle.textAlign = "left";
		piecesTitle.textBaseline = "alphabetic";	
		piecesTitle.shadow = new createjs.Shadow("#999999", 3, 3, 10);
		piecesTitle.y = 50;
		piecesTop.addChild(piecesTitle);
	
		hp.piecesContent = new createjs.Container();
		hp.pieces.addChild(hp.piecesContent);
		
		
		hp.piecesTiles = new cjs.Container();
		var count = 1;
		var spacing = 20;
		var tileSize = 144;
		var bitmap; var bitmap2;
	
		var checkLabel = new zim.Label("spacing",70,"wildwoodBold","#913322");
		// size, label, startChecked, color, margin
		hp.piecesCheckBox = new zim.CheckBox(50, checkLabel, true, "black", 30);
		var checkWidth = hp.piecesCheckBox.getBounds().width;
		var checkHeight = hp.piecesCheckBox.getBounds().height;
		
		hp.piecesContent.setBounds(0,0,tileSize*3+spacing*2,tileSize*3+spacing*2+checkHeight);
		var w = hp.piecesContent.getBounds().width;	
		
		hp.piecesOriginals = [];
		hp.piecesLights = [];
		for (var i=0; i<3; i++) {
			for (var j=0; j<3; j++) {
				bitmap = new cjs.Bitmap(preload.getResult("b"+count));
				bitmap.num = count;
				bitmap.x = j*(bitmap.getBounds().width+spacing);
				bitmap.y = i*(bitmap.getBounds().height+spacing);
				bitmap.alpha = .8;
				hp.piecesTiles.addChild(bitmap);
				hp.piecesOriginals.push(bitmap);
				
				bitmap2 = new cjs.Bitmap(preload.getResult("h"+count));
				bitmap2.num = count;
				bitmap2.x = j*(bitmap.getBounds().width+spacing);
				bitmap2.y = i*(bitmap.getBounds().height+spacing);
				bitmap2.alpha = .9;
				hp.piecesLights.push(bitmap2);
				
				count++;
			}
		}
		
		hp.currentTile = 7;
		hp.piecesTiles.removeChildAt(hp.currentTile);
		hp.piecesTiles.addChildAt(hp.piecesLights[hp.currentTile],hp.currentTile);
		hp.piecesTiles.cursor = "pointer";	
		
		hp.setTile = function(num) {
			hp.piecesTiles.removeChildAt(hp.currentTile);
			hp.piecesTiles.addChildAt(hp.piecesOriginals[hp.currentTile],hp.currentTile);
			hp.currentTile = num-1;
			hp.piecesTiles.removeChildAt(hp.currentTile);
			hp.piecesTiles.addChildAt(hp.piecesLights[hp.currentTile],hp.currentTile);
			stage.update();
		}

		hp.piecesTiles.on("click", function(e) {
			hp.setTile(e.target.num);
		});
		
		hp.piecesContent.addChild(hp.piecesTiles);
	
		hp.piecesCheckBox.x = 50;
		hp.piecesCheckBox.y = tileSize*3+spacing*3;
		hp.piecesCheckBox.alpha = .8;
		hp.piecesCheckBox.label.x -= 20;
		hp.piecesCheckBox.label.y -= 20;
		hp.piecesContent.addChild(hp.piecesCheckBox);
		
		
		var piecesBot = new createjs.Container();
		w = 500;
		h = 110
		piecesBot.setBounds(0,0,w,h);
		hp.pieces.addChild(piecesBot);
		//new zim.Grid(piecesBot,null,false);
		
		hp.piecesBack = makeBackButton(0, (h-80)/2);	
		piecesBot.addChild(hp.piecesBack);
		
		hp.piecesSave = new zim.Button(230,110,hideSaveLabel.clone(),"#918100","#ac9900","#ddd",4,30,"#776a00",20);		
		hp.piecesSave.x = (w-hp.piecesSave.width)/2; 
		hp.piecesSave.y = 0;
		piecesBot.addChild(hp.piecesSave);
		
		layoutManager.add(new zim.Layout(hp.pieces, 
			[{object:piecesTop, marginTop:8, maxWidth:100, height:8, align:"middle", valign:"top"}, 
			{object:hp.piecesContent, marginTop:3, maxWidth:100, align:"middle", valign:"top"},
			{object:piecesBot, marginTop:0, maxWidth:75, height:10, align:"middle", valign:"bottom"}],
		20, null, true, new createjs.Shape(), stage));	
				
		
		// hide page :: tile  ------------------------------------------

		
		hp.tile = new cjs.Container(); // code word page	
		hp.tile.name = "hpTile";
		
		var tileTop = new createjs.Container();
		hp.tile.addChild(tileTop);
		
		var tileTitle = new createjs.Text("UPLOAD", "70px wildwoodBold", "#913322");	
		tileTitle.textAlign = "left";
		tileTitle.textBaseline = "alphabetic";	
		tileTitle.shadow = new createjs.Shadow("#999999", 3, 3, 10);
		tileTitle.y = 50;
		tileTop.addChild(tileTitle);
	
	
		hp.tileContent = new createjs.Container();
		hp.tile.addChild(hp.tileContent);
		hp.tileContent.setBounds(0,0,640,640);
		var w = hp.tileContent.getBounds().width;
		
		hp.tileBacking = new cjs.Shape();
		hp.tileBacking.graphics.f("black").ss(1).s("white").rr(0,0,w,w,30);
		hp.tileBacking.alpha = .5;
		hp.tileBacking.setBounds(0,0,w,w)
		hp.tileContent.addChild(hp.tileBacking);
		
		hp.tilePics = new cjs.Container(); // will fill with tiles from data later
		hp.tiles = new cjs.Container(); 
		
		// tiles come from controller getting data from data
		
		for (var i=1; i<=9; i++) {
			hp["tileUploadBut"+i] = new cjs.DOMElement(zid("hpTileUpload"+i));
			stage.addChild(hp["tileUploadBut"+i]);
			hp["tileUploadBut"+i].alpha = 0;
			zss("hpTileUpload"+i).display = "none";
		}
	
		
		var tileBot = new createjs.Container();
		w = 500;
		h = 110
		tileBot.setBounds(0,0,w,h);
		hp.tile.addChild(tileBot);
		//new zim.Grid(tileBot,null,false);
		
		hp.tileBack = makeBackButton(0, (h-80)/2);	
		tileBot.addChild(hp.tileBack);
		
		hp.tileNext = new zim.Button(230,110,hideNextLabel.clone(),"#918100","#ac9900","#ddd",4,30,"#776a00",20);		
		hp.tileNext.x = (w-hp.tileNext.width)/2; 
		hp.tileNext.y = 0;
		tileBot.addChild(hp.tileNext);	
		
		hp.tileInfo = new zim.Button(80,80,codeInfoLabel.clone(),"#918100","#ac9900","#ddd",4,40,"#776a00",20);		
		hp.tileInfo.x = 418; 
		hp.tileInfo.y = 16;
		hp.tileInfo.alpha = .7;
		tileBot.addChild(hp.tileInfo);			
		

		layoutManager.add(new zim.Layout(hp.tile, 
			[{object:tileTop, marginTop:8, maxWidth:100, height:8, align:"middle", valign:"top"}, 
			{object:hp.tileContent, marginTop:3, maxWidth:100, align:"middle", valign:"top"},
			{object:tileBot, marginTop:3, maxWidth:75, height:10, align:"middle", valign:"bottom"}],
		20, null, true, new createjs.Shape(), stage));
		
		
		// hide page :: game  ------------------------------------------
		
		hp.game = new cjs.Container(); // game page that shows constraints	
		hp.game.name = "hpGame";	
	
		var gameTop = new createjs.Container();
		hp.game.addChild(gameTop);
		
		var gameTitle = new createjs.Text("GAME", "70px wildwoodBold", "#913322");	
		gameTitle.textAlign = "left";
		gameTitle.textBaseline = "alphabetic";	
		gameTitle.shadow = new createjs.Shadow("#999999", 3, 3, 10);
		gameTitle.y = 50;
		gameTop.addChild(gameTitle);		
				
		hp.gameContent = new createjs.Container();
		hp.game.addChild(hp.gameContent);
		hp.gameContent.setBounds(0,0,640,500);
		var w = hp.gameContent.getBounds().width;
		
		var gameText = new createjs.Text("odds of finding pieces", "60px wildwoodBold", "white");	
		gameText.textAlign = "center";
		gameText.textBaseline = "alphabetic";	
		gameText.shadow = new createjs.Shadow("#999999", 3, 3, 10);	
		gameText.x = w/2; 
		gameText.y = 0;
		hp.gameContent.addChild(gameText);
		
		var oddsList = [".001%", ".01%", ".1%", "1%", "5%","10%","15%","20%","25%","30%","35%","40%","45%","50%","55%","60%","65%","70%","75%","80%","85%","90%","95%","100%"];
		var oddsLabel = new zim.Label("", 64, "arial", "#70423a");	
		var odds = hp.gameOdds = new zim.Stepper(oddsList, 250, "#dddddd", "#70423a", oddsLabel, false, false);
		odds.currentValue = "80%";
		hp.gameContent.addChild(odds);
		odds.x = (hp.gameContent.getBounds().width - odds.getBounds().width)/2;
		odds.y = 60;
		
		var gameText2 = new createjs.Text("time between looks", "60px wildwoodBold", "white");	
		gameText2.textAlign = "center";
		gameText2.textBaseline = "alphabetic";		
		gameText2.shadow = new createjs.Shadow("#999999", 3, 3, 10);
		gameText2.x = w/2; 
		gameText2.y = 290;
		hp.gameContent.addChild(gameText2);
		
		var timeList = ["0 sec", "5 sec", "10 sec", "15 sec", "20 sec", "30 sec", "45 sec", "1 min", "1.5 min", "2 min", "3 min", "4 min", "5 min", "10 min", "20 min", "30 min", "60 min", "1 day"];
		var timeLabel = new zim.Label("", 64, "arial", "#70423a");
		var time = hp.gameTime = new zim.Stepper(timeList, 250, "#dddddd", "#70423a", timeLabel, false, false);
		time.currentValue = "20 sec";
		hp.gameContent.addChild(time);
		time.x = (hp.gameContent.getBounds().width - time.getBounds().width)/2;
		time.y = 350;
		
		// zim.outline(odds);
		
		var gameBot = new createjs.Container();
		w = 500;
		h = 110
		gameBot.setBounds(0,0,w,h);
		hp.game.addChild(gameBot);
		
		hp.gameBack = makeBackButton(0, (h-80)/2);	
		gameBot.addChild(hp.gameBack);
		
		hp.gameSave = new zim.Button(230,110,hideSaveLabel.clone(),"#918100","#ac9900","#ddd",4,30,"#776a00",20);		
		hp.gameSave.x = (w-hp.gameSave.width)/2; 
		hp.gameSave.y = 0;
		gameBot.addChild(hp.gameSave);	
		
		layoutManager.add(new zim.Layout(hp.game, 
			[{object:gameTop, marginTop:8, maxWidth:100, height:8, align:"middle", valign:"top"}, 
			{object:hp.gameContent, marginTop:8, maxWidth:100, align:"middle", valign:"middle"},
			{object:gameBot, marginTop:5, maxWidth:75, height:10, align:"middle", valign:"bottom"}],
		20, null, true, new createjs.Shape(), stage));	
		
		
		// hide page :: sponsor (and Publish)  ------------------------------------------
		
		
		hp.sponsor = new cjs.Container(); // code word page	
		hp.sponsor.name = "hpSponsor";
		
		var sponsorTop = new createjs.Container();
		hp.sponsor.addChild(sponsorTop);
		
		var sponsorTitle = new createjs.Text("SPONSORS", "70px wildwoodBold", "#913322");	
		sponsorTitle.textAlign = "left";
		sponsorTitle.textBaseline = "alphabetic";	
		sponsorTitle.shadow = new createjs.Shadow("#999999", 3, 3, 10);
		sponsorTitle.y = 50;
		sponsorTop.addChild(sponsorTitle);
	
		hp.sponsorContent = new createjs.Container();
		hp.sponsor.addChild(hp.sponsorContent);
		
		
		hp.sponsorContent.setBounds(0,0,480,480);
		var w = hp.sponsorContent.getBounds().width;	
		var sponsorTileScale = .5;
		
		var sponsorText1 = new createjs.Text("pic and url", "60px wildwoodBold", "white");	
		sponsorText1.textAlign = "left";
		sponsorText1.textBaseline = "alphabetic";	
		sponsorText1.shadow = new createjs.Shadow("#999999", 3, 3, 10);	
		sponsorText1.x = 180; 
		sponsorText1.y = 40;
		hp.sponsorContent.addChild(sponsorText1);

		hp.sponsorTile1 = app.drawTile("X");
		hp.sponsorTile1.cursor = "pointer";
		hp.sponsorTile1.mouseChildren = false;
		hp.sponsorTile1.shadow = new createjs.Shadow("#333333", 3, 3, 10);
		hp.sponsorTile1.x = 0; 
		hp.sponsorTile1.y = 0;
		zim.scale(hp.sponsorTile1,sponsorTileScale);
		hp.sponsorContent.addChild(hp.sponsorTile1);
		
		hp.sponsorPic1 = new cjs.Container(); // will fill with sponsors from data later
		hp.sponsorContent.addChild(hp.sponsorPic1);
		hp.sponsorPic1.setBounds(0,0,hp.sponsorTile1.getBounds().width*sponsorTileScale,hp.sponsorTile1.getBounds().height*sponsorTileScale);
		hp.sponsorPic1.x = hp.sponsorTile1.x; 
		hp.sponsorPic1.y = hp.sponsorTile1.y;
		
		hp.sponsorUploadBut1 = new cjs.DOMElement(zid("hpSponsorUpload1"));
		stage.addChild(hp.sponsorUploadBut1);
		hp.sponsorUploadBut1.alpha = 0;
		zss("hpSponsorUpload1").display = "none";
		
		hp.sponsorUrl1 = new cjs.DOMElement(zid("hpSponsorUrl1"));
		stage.addChild(hp.sponsorUrl1);
		zss("hpSponsorUrl1").display = "none";		
		
		// these are place holders for the input text fields 
		// the input fields get scaled in the main code resizing functions
		hp.sponsorUrlShape1 = new createjs.Shape();
		hp.sponsorUrlShape1.graphics.f("white").r(180,70,0,0);
		hp.sponsorUrlShape1.setBounds(180,70,270,76);		
		hp.sponsorContent.addChild(hp.sponsorUrlShape1);

		var sponsorText2 = new createjs.Text("pic and url", "60px wildwoodBold", "white");	
		sponsorText2.textAlign = "left";
		sponsorText2.textBaseline = "alphabetic";	
		sponsorText2.shadow = new createjs.Shadow("#999999", 3, 3, 10);	
		sponsorText2.x = 180; 
		sponsorText2.y = 240;
		hp.sponsorContent.addChild(sponsorText2);
		
		
		hp.sponsorTile2 = app.drawTile("X");
		hp.sponsorTile2.cursor = "pointer";
		hp.sponsorTile2.mouseChildren = false;
		hp.sponsorTile2.shadow = new createjs.Shadow("#333333", 3, 3, 10);
		hp.sponsorTile2.x = 0; 
		hp.sponsorTile2.y = 200;
		zim.scale(hp.sponsorTile2,sponsorTileScale);
		hp.sponsorContent.addChild(hp.sponsorTile2);
		
		hp.sponsorPic2 = new cjs.Container(); // will fill with sponsors from data later
		hp.sponsorContent.addChild(hp.sponsorPic2);
		hp.sponsorPic2.setBounds(0,0,hp.sponsorTile2.getBounds().width*sponsorTileScale,hp.sponsorTile2.getBounds().height*sponsorTileScale);
		hp.sponsorPic2.x = hp.sponsorTile2.x; 
		hp.sponsorPic2.y = hp.sponsorTile2.y;
		
		hp.sponsorUploadBut2 = new cjs.DOMElement(zid("hpSponsorUpload2"));
		stage.addChild(hp.sponsorUploadBut2);
		hp.sponsorUploadBut2.alpha = 0;
		zss("hpSponsorUpload2").display = "none";
		
		hp.sponsorUrl2 = new cjs.DOMElement(zid("hpSponsorUrl2"));
		stage.addChild(hp.sponsorUrl2);
		zss("hpSponsorUrl2").display = "none";		
		
		// these are place holders for the input text fields 
		// the input fields get scaled in the main code resizing functions
		hp.sponsorUrlShape2 = new createjs.Shape();
		hp.sponsorUrlShape2.graphics.f("white").r(180,270,0,0);
		hp.sponsorUrlShape2.setBounds(180,270,270,76);		
		hp.sponsorContent.addChild(hp.sponsorUrlShape2);
		
		
		
		// new zim.Grid(hp.sponsorContent,null,false);
		// new zim.Guide(hp.sponsorContent);
	
		var sponsorCheckLabel = new zim.Label("publish",70,"wildwoodBold","#913322");
		// size, label, startChecked, color, margin
		hp.sponsorCheckBox = new zim.CheckBox(50, sponsorCheckLabel, true, "black", 30);
		var checkWidth = hp.sponsorCheckBox.getBounds().width;
		var checkHeight = hp.sponsorCheckBox.getBounds().height;
	
		hp.sponsorCheckBox.x = 50;
		hp.sponsorCheckBox.y = 400;
		hp.sponsorCheckBox.alpha = .8;
		hp.sponsorCheckBox.label.x -= 20;
		hp.sponsorCheckBox.label.y -= 20;
		hp.sponsorContent.addChild(hp.sponsorCheckBox);
		
		
		var sponsorBot = new createjs.Container();
		w = 500;
		h = 110
		sponsorBot.setBounds(0,0,w,h);
		hp.sponsor.addChild(sponsorBot);
		//new zim.Grid(sponsorBot,null,false);
		
		hp.sponsorBack = makeBackButton(0, (h-80)/2);	
		sponsorBot.addChild(hp.sponsorBack);
		
		hp.sponsorSave = new zim.Button(230,110,hideSaveLabel.clone(),"#918100","#ac9900","#ddd",4,30,"#776a00",20);		
		hp.sponsorSave.x = (w-hp.sponsorSave.width)/2; 
		hp.sponsorSave.y = 0;
		sponsorBot.addChild(hp.sponsorSave);	
		
		hp.sponsorInfo = new zim.Button(80,80,codeInfoLabel.clone(),"#918100","#ac9900","#ddd",4,40,"#776a00",20);		
		hp.sponsorInfo.x = 418; 
		hp.sponsorInfo.y = 16;
		hp.sponsorInfo.alpha = .7;
		sponsorBot.addChild(hp.sponsorInfo);			
		
		

		layoutManager.add(new zim.Layout(hp.sponsor, 
			[{object:sponsorTop, marginTop:8, maxWidth:100, height:8, align:"middle", valign:"top"}, 
			{object:hp.sponsorContent, marginTop:3.5, maxWidth:100, align:"middle", valign:"top"},
			{object:sponsorBot, marginTop:0, maxWidth:75, height:10, align:"middle", valign:"bottom"}],
		20, null, true, new createjs.Shape(), stage));	
		
		
		
		
		////////////////////////////////////////////////
		
		
		function makeBackButton(xPos, yPos) {
			var bbLabel = new zim.Label("",60,"wildwoodBold","white","white");		
			var bb = new zim.Button(80,80,bbLabel,"#918100","#ac9900","#ddd",4,40,"#776a00",20);		
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
	
		return hp;
	}

	return app;
} (app || {});		