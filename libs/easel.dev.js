var Easel;
(function(a){
	W=window;
	D=document;
	M=Math;
	C=D.createElement("canvas");
	ctx=C.getContext("2d");
	$=function(c){return D.getElementById(c)};
	q=function(){C.width=v.w;C.height=v.h};
	u=function(){ctx=C.getContext("2d")};
	w=function(){d=W;b="inner";if(!(d.innerWidth)){b="client";d=D.documentElement||D.body}return{w:d[b+"Width"],h:d[b+"Height"]}};
	v=w();
	a.background="#000";
	a.redraw=function(){
		ctx.fillStyle=a.background;
		ctx.fillRect(0,0,v.w,v.h)
	};
	W.r=function(f,g,e){g=g||0;e=e||true;g=M.random()*(g-f);g=g<0?M.random()*g:g+f;return e==false?M.floor(g):g};
	W.onresize=function(){W.v=w();q();a.redraw()};
	D.body.appendChild(C);
	d=document.createElement("style");
	d.type="text/css";d.rel="stylesheet";
	d.innerHTML="body{background-color:"+a.background+";overflow:hidden;margin:0;}.canvas{position:absolute;left:0;top:0;width:"+v.w+"px;height:"+v.h+"px;}";
	D.getElementsByTagName("head")[0].appendChild(d);q()
})(Easel||(Easel={}));