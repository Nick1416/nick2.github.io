var Blocks = [
	[0,5],
	[1,4,6],
	[2,5,7],
	[3,6],
	[4,1,9],
	[5,0,2,8,10],
	[6,1,3,9,11],
	[7,2,10],
	[8,5,13],
	[9,4,6,12,14],
	[10,5,7,13,15],
	[11,6,14],
	[12,9],
	[13,8,10],
	[14,9,11],
	[15,10],
	[16,5,6,9,10]
];

var clicked = [false, false];

var canvas = document.createElement('canvas');
canvas.width = 1000;
canvas.height = 1000;
canvas.addEventListener('mousedown', onMouseDown);
canvas.addEventListener('mousemove', onMouseOver);
document.body.appendChild(canvas); 
document.body.style.backgroundColor = "black";

var c = [];
for(i=0;i<17;i++) {
	c.push(i);
}

var ctx = canvas.getContext("2d");
var Rect;
var RectOffsetX 
var RectOffsetY;
setRect();

var x = [10, 127, 244, 361, 10, 127, 244, 361, 10, 127, 244, 361, 10, 127, 244, 361, 500];
var y = [10, 10, 10, 10, 127 ,127, 127, 127, 244, 244, 244, 244, 361, 361, 361, 361, 361];
var w = 97;
var h = 97;
var r = 5;

var red = [];
for(i = 0; i < c.length; i++) {
	red.push(ctx.createLinearGradient(x[i], y[i], x[i] + w, y[i] + h));
	red[i].addColorStop(0.1, "#FF4E50");
	red[i].addColorStop(0.6, "#870000");
}
	
var green = [];
for(i=0;i<c.length;i++) {
	green.push(ctx.createLinearGradient(x[i], y[i], x[i] + w, y[i] + h));
	green[i].addColorStop(0.1, "#A6FFCB");
	green[i].addColorStop(0.6, "#3CA55C");	
}

function square(id, color) {
	//Drawing the 'squares'
	ctx.beginPath();
	ctx.moveTo(x[id] + r, y[id]);
	ctx.lineTo(x[id] + w - r, y[id]);
	ctx.arcTo(x[id] + w, y[id], x[id] + w, y[id] + r, r);
	ctx.lineTo(x[id] + w, y[id] + h - r);
	ctx.arcTo(x[id] + w, y[id] + h, x[id] + w - r, y[id] + h, r);
	ctx.lineTo(x[id] + r, y[id] + h);
	ctx.arcTo(x[id], y[id] + h, x[id], y[id] + h - r, r);
	ctx.lineTo(x[id], y[id] + r);
	ctx.arcTo(x[id], y[id], x[id] + r, y[id], r);
	ctx.closePath();
	
	//Properties of 'squares'
	ctx.lineWidth = 6;
	ctx.fillStyle = color;
	ctx.fill();
	ctx.strokeStyle = '#3b4449';
	ctx.stroke();		
}

function isInSquare(e) {
	var mx = event.clientX-RectOffsetX;
	var my = event.clientY-RectOffsetY;
	if(mx>=x[e] && mx<=x[e] + w && my>=y[e] && my<=y[e] + h) {
		return true;
	}
	return false;
}

function onMouseDown() {
	var mx = event.clientX-RectOffsetX;
	var my = event.clientY-RectOffsetY;
	for(i=0;i<c.length;i++) {
		if(isInSquare(i)){
			for(j=0;j<Blocks.length;j++) {
				squareClicked(Blocks[i][j]);
			}
		}
	}
}

function onMouseOver() {
	for(i=0;i<c.length;i++) {
		if(isInSquare(i)) {
			this.style.cursor = 'pointer';
			break;
		}
		else {
			this.style.cursor = 'auto';
		}
	}
}

function setRect() {
  Rect = canvas.getBoundingClientRect();
  RectOffsetX = Rect.left;
  RectOffsetY = Rect.top;
}

function squareClicked(e) {
	if(!clicked[e]) {
		square(e, green[e]);
		clicked[e] = true;
		}
	else {
		square(e, red[e]);
		clicked[e] = false;
	}
}

for(i=0;i<c.length;i++) {
	square(i, red[i]);
}
