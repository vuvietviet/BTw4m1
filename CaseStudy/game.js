let canvas = document.getElementById('game');
let context = canvas.getContext("2d");

let ball = {
    x: 20,
    y: 150,
    dx: 5,
    dy: 2,
    radius: 5,
}

let paddle = {
    width: 70,
    height: 10,
    x: 0,
    y: canvas.height - 10,
    speed: 10,

    isMovingLeft: false,
    isMovingRight: false,
}

let brickConfig = {
    offSetX: 25,
    offSetY: 25,
    marginB: 25,
    widthB: 70,
    heightB: 10,
    totalRows: 4,
    totalCols: 5,
}

let sound = [new Audio("sound1.mp3"), new Audio("win.mp3")
    ,new Audio("lose.mp3"),new Audio("sound2.mp3")];

let isGameOver = false;
let isGameWin = false;
let userScore = 0;
let maxScore = brickConfig.totalRows * brickConfig.totalCols;
let brickList = [];

let begin = false;


for (let i = 0; i < brickConfig.totalRows; i++) {
    for (let j = 0; j < brickConfig.totalCols; j++) {
        brickList.push({
            x: brickConfig.offSetX + j*(brickConfig.widthB+brickConfig.marginB),
            y: brickConfig.offSetY + i*(brickConfig.heightB+brickConfig.marginB),
            isBroken: false,
        })
    }
}

document.addEventListener('keyup',function (event){
    if (event.keyCode === 37) {
        paddle.isMovingLeft = false;
    } else if (event.keyCode === 39) {
        paddle.isMovingRight = false;
    }
})

document.addEventListener('keydown',function (event){
    if (event.keyCode === 37) {
        paddle.isMovingLeft = true;
    } else if (event.keyCode === 39) {
        paddle.isMovingRight = true;
    }
})

function drawBall () {
    context.beginPath();
    context.arc(ball.x,ball.y,ball.radius,0,2*Math.PI);
    context.fillStyle = 'beige';
    context.fill();
    context.closePath();
}

function drawPaddle () {
    context.beginPath();
    context.rect(paddle.x,paddle.y,paddle.width,paddle.height);
    context.fillStyle = 'grey';
    context.fill();
    context.closePath();
}

// 2*OffSet+5*width+4*margin=500
// =>OffSet=margin=25
//   width=70
//   rows=3
//   column=5
function drawBricks() {
   brickList.forEach(function (b) {
       if (!b.isBroken) {
           context.beginPath();
           context.rect(b.x,b.y,brickConfig.widthB,brickConfig.heightB);
           context.fillStyle = 'peru';
           context.fill();
           context.closePath();
       }
   })
}

function backgroundCanvas() {
    let img = document.getElementById('image');
    context.drawImage(img,0,0,500,500);
}

function handleBallCollideBounds() {
    if (ball.x < ball.radius || ball.x > canvas.width - ball.radius) {
        ball.dx = -ball.dx;
    }
    if (ball.y < ball.radius) {
        ball.dy = -ball.dy;
    }
}

function handleBallCollidePaddle() {
    if (ball.x + ball.radius >= paddle.x &&
        ball.x + ball.radius <= paddle.x + paddle.width &&
        ball.y + ball.radius >= canvas.height - paddle.height) {
        sound[3].play();
        ball.dy = -ball.dy;
    }
}

function handleBallCollideBricks() {
    brickList.forEach(function (b) {
        if (!b.isBroken) {
            if (ball.x >= b.x && ball.x <= b.x + brickConfig.widthB &&
            ball.y + ball.radius >= b.y && ball.y - ball.radius <= b.y + brickConfig.heightB) {
                sound[0].play();
                ball.dy = -ball.dy
                b.isBroken = true;
                userScore += 1;
                document.getElementById('showScore').innerHTML = userScore;
                if (userScore >= maxScore) {
                    isGameOver = true;
                    isGameWin = true;
                }
            }
        }
    })
}

function updateBallPosition() {
    ball.x += ball.dx;
    ball.y += ball.dy;
}

function updatePaddlePosition() {
    if (paddle.isMovingLeft) {
        paddle.x -= paddle.speed;
    } else if (paddle.isMovingRight) {
        paddle.x += paddle.speed;
    }
    if (paddle.x < 0) {
        paddle.x = 0;
    } else if (paddle.x > canvas.width - paddle.width) {
        paddle.x = canvas.width - paddle.width;
    }
}

function checkGameOver() {
    if (ball.y > canvas.height - ball.radius) {
        isGameOver = true;
    }
}

function handleGameOver() {
    if (isGameWin) {
        sound[1].play();
        alert('You win');
    } else {
        sound[2].play();
        alert('You lose');
    }
}

let checkpau = false;
function pau() {
    checkpau = true;
}



function draw() {
    if (!isGameOver) {
        context.clearRect(0,0,canvas.width,canvas.height);
        backgroundCanvas();
        drawBall();
        drawPaddle();
        drawBricks();

        if(begin) {
            handleBallCollideBounds();
            handleBallCollidePaddle();
            handleBallCollideBricks();

            updateBallPosition();
            updatePaddlePosition();
            checkGameOver();

            // requestAnimationFrame(draw);
            if(checkpau) {
                cancelAnimationFrame(draw);
            }
            if(!checkpau) {
                requestAnimationFrame(draw);
            }
        }
    } else {
        handleGameOver();
    }
}

draw();

function sta() {
    begin = true;
    draw();
}

function conti() {
    checkpau = false;
    draw();
}





