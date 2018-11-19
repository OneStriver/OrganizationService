function cmainFrame(){
	var hmain = document.getElementById("mainFrame");
	var bwidth = document.documentElement.clientWidth;
	var bheight = document.documentElement.clientHeight;
	hmain .style.width = (bwidth  - 10) + 'px';
	hmain .style.height = (bheight  - 10) + 'px';
}
cmainFrame();
window.onresize=function(){  
	cmainFrame();
};