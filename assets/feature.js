// 根据i返回渐变色
function gCL(k) {
	var x = k*9+1;
	var r = Math.floor(-0.1761*Math.pow(x,4)+3.5492*Math.pow(x,3)-20.199*Math.pow(x,2)+47*x-3.5833);
	var g = Math.floor(-0.0334*Math.pow(x,4)+0.6452*Math.pow(x,3)-3.9256*Math.pow(x,2)+27.169*x+54.75);
	var b = Math.floor(0.0587*Math.pow(x,4)-1.2348*Math.pow(x,3)+6.6234*Math.pow(x,2)+14.387*x+93.75);

	return 'rgb('+r+','+g+','+b+')';
}
