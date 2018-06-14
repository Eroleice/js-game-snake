var 
canvas = document.getElementById('canvas'),
ctx = canvas.getContext('2d'),
scoreBoard = document.getElementById('score'),
direction = '',
fps = 80,
snake = [],
snakeLength = 5,
cellSize = 20,
snakeColor = [],
appleColor = '#ff3636',
X = [],
Y = []
food = {
	x: 0,
	y: 0
},
score = 0;

// 获取全部格子
for(i = 0; i <= canvas.width - cellSize; i+=cellSize) {
	X.push(i);
	Y.push(i);
}

// 设置canvas的tabindex（使canvas可以被焦点）
canvas.setAttribute('tabindex',1);

// canvas边框设置（无边框）
canvas.style.outline = 'none';

// 自动焦点canvas
canvas.focus();

// 填充一个格子
function fillSquare(x,y,color) {
	ctx.fillStyle = color;
	ctx.fillRect(x, y, cellSize, cellSize);
}

// 更新snake颜色
function colorUpdate() {
	snakeColor = [];
	for(i = 0; i < snake.length; i++) {
		snakeColor.push(gCL(i/snake.length));
	}
}

// 创造一个苹果！像乔布斯一样！
function steveJobs() {
	food.x = X[Math.floor(Math.random()*X.length)]; // random x position from array
	food.y = Y[Math.floor(Math.random()*Y.length)]; // random y position from array
	// looping through the snake and checking if there is a collision
	for(i = 0; i < snake.length; i++) {
		if(checkHit(food.x, food.y, snake[i].x, snake[i].y)) {
			steveJobs(); 
		}
	}
}

function drawApple() {
	fillSquare(food.x, food.y, appleColor);
}

// 初始化snake
function initialSnake() {
	snake = [];
	for (var i = snakeLength; i > 0; i--) {
		k = i * cellSize;
		snake.push({x:k,y:0});
	}
	colorUpdate();
}

// 绘制snake
function drawSnake() {
	for (var i = 0; i < snake.length; i++) {
		fillSquare(snake[i].x, snake[i].y, snakeColor[i]);
	}
}

// 移动Snake
function moveSnake() {
		var x = snake[0].x;
		var y = snake[0].y;
		direction = directionQueue;
		if (direction == 'right') {
			x = (x+cellSize) % canvas.width;
		} else if (direction == 'left') {
			x = (x+canvas.width-cellSize) % canvas.width;
		} else if (direction == 'up') {
			y = (y+canvas.height-cellSize) % canvas.height;
		} else if (direction == 'down') {
			y = (y+cellSize) % canvas.height;
		}
		var tail = snake.pop();
		tail.x = x;
		tail.y = y;
		snake.unshift(tail);
}

// 绘制背景
function drawBackground(){
	ctx.fillStyle = '#fff';
	ctx.strokeStyle = '#ddd';
	ctx.fillRect(0, 0, canvas.height, canvas.width);
	for(var x = 0.5; x < canvas.width; x += cellSize) {
		ctx.moveTo(x, 0);
		ctx.lineTo(x, canvas.height);
	}
	for(var y = 0.5; y < canvas.height; y += cellSize) {
		ctx.moveTo(0, y);
		ctx.lineTo(canvas.width, y);
	}

	ctx.stroke();
}

function checkHit(x1,y1,x2,y2) {
	if(x1 == x2 && y1 == y2) {
		return true;
	}
	else {
		return false;
	}
}

// keyboard interactions | direction != '...' doesn't let the snake go backwards
function changeDirection(keycode) {
	if(keycode == 37 && direction != 'right') { directionQueue = 'left'; }
	else if(keycode == 38 && direction != 'down') { directionQueue = 'up'; }
	else if(keycode == 39 && direction != 'left') { directionQueue = 'right'; }
	else if(keycode == 40 && direction != 'up') { directionQueue = 'down' }
}

// Main Loop!
function game() {
	// 检测头部事件
	var head = snake[0];
	// 撞到自己
	for(i = 3; i < snake.length; i++) {
		if(head.x == snake[i].x && head.y == snake[i].y) {
			score = 0;
			direction = 'right';
			directionQueue = 'right';
			ctx.beginPath();
			drawBackground();
			initialSnake();
			steveJobs();
		}
	}
	// 吃苹果
	if(checkHit(head.x, head.y, food.x, food.y)) {
		snake[snake.length] = {x: head.x, y: head.y};
		colorUpdate();
		steveJobs();
		drawApple();
		score += 10;
	}
	// 检测按键
	canvas.onkeydown = function(evt) {
		evt = evt || window.event;
		changeDirection(evt.keyCode);
	};
	
	ctx.beginPath();
	drawBackground();
	drawSnake();
	drawApple();
	moveSnake();
	scoreBoard.innerHTML = score;
}

// 初始化
function startGame() {
	score = 0;
	direction = 'right';
	directionQueue = 'right';
	ctx.beginPath();
	drawBackground();
	initialSnake();
	steveJobs();
	
	if (typeof loop != 'undefined') {
		clearInterval(loop);
	} else {
		loop = setInterval(game, fps);
	}
	
}

// 运行！
startGame();
