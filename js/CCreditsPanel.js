function CCreditsPanel(){
    
    var _oBg;
    var _oButLogo;
    var _oButExit;
    var _oMsgText;
    var _oMsgTextOutline;
    
    var _oHitArea;
    
    var _oLink;
    var _oLinkOutline;
    
    var _pStartPosExit;
    
    var _oContainer;
    
    this._init = function(){
        _oContainer = new createjs.Container();
        _oContainer.alpha = 0;
        s_oStage.addChild(_oContainer);
        
        var oFade = new createjs.Shape();
        oFade.graphics.beginFill("rgba(0,0,0,0.7)").drawRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        _oContainer.addChild(oFade);
        
        _oBg = createBitmap(s_oSpriteLibrary.getSprite('msg_box'));
        _oContainer.addChild(_oBg);
        
        _oHitArea = new createjs.Shape();
        _oHitArea.graphics.beginFill("#0f0f0f").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oHitArea.alpha = 0.01;
        _oHitArea.on("click", this._onLogoButRelease);
        _oContainer.addChild(_oHitArea);
                
        var oSprite = s_oSpriteLibrary.getSprite('but_exit_small');
        _pStartPosExit = {x: 620, y: 180};  
        _oButExit = new CGfxButton(_pStartPosExit.x, _pStartPosExit.y, oSprite, _oContainer);
        _oButExit.addEventListener(ON_MOUSE_UP, this.unload, this);
       
        _oMsgTextOutline = new createjs.Text(TEXT_CREDITS_DEVELOPED, "30px " + FONT_GAME, "#000");
        _oMsgTextOutline.textAlign = "center";
        _oMsgTextOutline.textBaseline = "alphabetic";
	_oMsgTextOutline.x = CANVAS_WIDTH/2 + 20;
        _oMsgTextOutline.y = 230;
        _oMsgTextOutline.outline = 2;
	_oContainer.addChild(_oMsgTextOutline);
       
        _oMsgText = new createjs.Text(TEXT_CREDITS_DEVELOPED, "30px " + FONT_GAME, "#fff");
        _oMsgText.textAlign = "center";
        _oMsgText.textBaseline = "alphabetic";
	_oMsgText.x = CANVAS_WIDTH/2 + 20;
        _oMsgText.y = 230;
	_oContainer.addChild(_oMsgText);
		
        oSprite = s_oSpriteLibrary.getSprite('logo_ctl');
        _oButLogo = createBitmap(oSprite);
        _oButLogo.regX = oSprite.width/2;
        _oButLogo.regY = oSprite.height/2;
        _oButLogo.x = CANVAS_WIDTH/2 + 20;
        _oButLogo.y = 265;
        _oContainer.addChild(_oButLogo);
        
        _oLinkOutline = new createjs.Text(TEXT_LINK1, "20px " + FONT_GAME, "#000");
        _oLinkOutline.textAlign = "center";
        _oLinkOutline.textBaseline = "alphabetic";
	_oLinkOutline.x = CANVAS_WIDTH/2+ 20;
        _oLinkOutline.y = 310;
        _oLinkOutline.outline = 2;
        _oContainer.addChild(_oLinkOutline);
        
        _oLink = new createjs.Text(TEXT_LINK1, "20px " + FONT_GAME, "#fff");
        _oLink.textAlign = "center";
        _oLink.textBaseline = "alphabetic";
	_oLink.x = CANVAS_WIDTH/2+ 20;
        _oLink.y = 310;
        _oContainer.addChild(_oLink);
        
	createjs.Tween.get(_oContainer).to({alpha:1} , 600,createjs.Ease.cubicOut);
        
	this.refreshButtonPos(s_iOffsetX, s_iOffsetY);
    };
	
    this.refreshButtonPos = function (iNewX, iNewY) {
    };
    
    this.unload = function(){
        _oHitArea.off("click", this._onLogoButRelease);
        
        _oButExit.unload(); 
        _oButExit = null;

        s_oStage.removeChild(_oContainer);
    };
    
    this._onLogoButRelease = function(){
        window.open("https://yello8.com","_blank");
    };
    
    this._init();
    
    
};


