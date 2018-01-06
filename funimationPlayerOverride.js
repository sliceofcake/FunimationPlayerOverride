(function(){
	var p = {
		// visibility state
		vis : true,
		// height previous
		h : 0,
		// the actual height of the displayed video, excluding any black gaps
		hVideo : 0,
		// height of the potential black gap at the bottom of the screen
		bottomGap : 0,
		// whether to temporarily show the mouse around the time of mouse movement even if it's hidden
		mouseShowF : false,
		//
		mouseShowDelayHandle : null,
		// generate style text
		gst : function(){
			return ""
			+" @import url('https://fonts.googleapis.com/css?family=Open+Sans:700');"
			+(this.vis ? "" : ".funimation-player-override-hidden {display:none !important;}")
			+((this.vis || this.mouseShowF) ? "" : "* {cursor:none !important;}")
			+" .funimation-player-override-subtitle>div>div {width:100% !important;height:auto !important;bottom:0px !important;top:unset !important;}"
			+" .funimation-player-override-subtitle>div>div>div {font-family:'Open Sans',sans-serif !important;line-height:1.2em !important;letter-spacing:-0.025em !important;font-size:"+(this.hVideo * 0.0527)+"px;font-weight:700 !important;color:white !important;background-color:transparent !important;text-stroke:0em black !important;-webkit-text-stroke:0em black !important;text-shadow:0px 0px 0.2em black,0px 0px 0.2em black,0px 0px 0.2em black,0px 0px 0.2em black,0px 0px 0.2em black,0px 0px 0.2em black,0px 0px 0.2em black,0px 0px 0.2em black,0px 0px 0.2em black,0px 0px 0.2em black,0px 0px 0.2em black,0px 0px 0.2em black !important;}"
			+" .vjs-text-track-display {bottom:"+(this.bottomGap + (this.hVideo * 0.0194))+"px !important;}" // originally 3em
			+" #funimation-gradient {display:none !important;}";},
		// assert style
		ast : function(){this.qd(this.doc,"#funimation-player-override-style").textContent = p.gst();},
		// event-block
		evb : function(ev){ev.stopPropagation();ev.preventDefault();},
		// key enun
		kye : {_:32,l:37,r:39,u:38,d:40,f:70,s:83},
		// query selector downward
		qd  : function(elP,s){return elP.querySelector(s);},
		// query selector downward all
		qda : function(elP,s){return elP.querySelectorAll(s);},
	};
	p.doc = p.qd(document,"#player").contentDocument;
	p.elv = p.qd(p.doc,"video");
	
	// check for resizes occasionally
	setInterval((function(p){return function(){
		if (p.h !== p.elv.clientHeight){
			var wMultN = p.elv.clientWidth  / p.elv.videoWidth ;
			var hMultN = p.elv.clientHeight / p.elv.videoHeight;
			p.hVideo = p.elv.videoHeight * Math.min(wMultN,hMultN);
			p.bottomGap = (p.elv.clientHeight - p.hVideo) / 2;
			p.ast();}};})(p),500);
	
	// tag the clutter
	var elL = p.qda(p.doc,"#brightcove-player>:not(video):not(.vjs-text-track-display)");
	for (var elLI = 0,elLC = elL.length; elLI < elLC; elLI++){var el = elL[elLI];
		el.classList.add("funimation-player-override-hidden");}
	
	// tag subtitles
	p.qd(p.doc,".vjs-text-track-display").classList.add("funimation-player-override-subtitle");
	
	// remove funi style
	var el = p.qd(p.doc,"#subtitle-style");
	el.parentNode.removeChild(el);
	
	// assert style
	var el = document.createElement("style");
	el.id = "funimation-player-override-style";
	p.doc.head.appendChild(el);
	p.ast();
	
	// mousemove will temporarily show mouse if it's hidden
	p.doc.addEventListener("mousemove",(function(p){return function(ev){
		p.mouseShowF = true;
		p.ast();
		clearTimeout(p.mouseShowDelayHandle);
		p.mouseShowDelayHandle = setTimeout((function(p){return function(){p.mouseShowF = false;p.ast();};})(p),500);};})(p));
	
	// mousedown will show/hide clutter
	p.elv.addEventListener("mousedown",(function(p){return function(ev){
		p.vis = !p.vis;
		p.ast();};})(p));
	
	// keydown will block default events such as scroll
	p.doc.addEventListener("keydown",(function(p){return function(ev){
		if ([32,37,39,38,40].includes(ev.keyCode)){p.evb(ev);}};})(p));
	
	// keyup bound to shortcuts
	p.doc.addEventListener("keyup",(function(p){return function(ev){
		switch (ev.keyCode){default:;
			//break;case p.kye._ : p.evb(ev);p.elv.paused?p.elv.play():p.elv.pause();
			break;case p.kye.l : p.evb(ev);p.elv.currentTime -=  1;
			break;case p.kye.r : p.evb(ev);p.elv.currentTime +=  1;
			break;case p.kye.s : p.evb(ev);p.elv.currentTime += 85;
			//break;case p.kye.u : p.evb(ev);p.elv.volume += 0.1;
			//break;case p.kye.d : p.evb(ev);p.elv.volume -= 0.1;
			break;case p.kye.f : p.evb(ev);p.qd(p.doc,"#funimation-control-fullscreen").click();}};})(p));
})();