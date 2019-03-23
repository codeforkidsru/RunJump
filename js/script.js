function startGame() {
    gameArea.start();
}


var gameArea = {
    height: 180,
    width: 320,
    context: document.querySelector("canvas").getContext("2d"),
    start: function() {
        this.context.canvas.height = this.height;
        this.context.canvas.width = this.width;
        
        document.addEventListener("keydown", rectangle.motion.keyListener)
        document.addEventListener("keyup", rectangle.motion.keyListener);

        setInterval(updateGameArea, 20);
    },
    clear: function() {
        this.context.fillStyle = "darkgray";
        this.context.fillRect(0, 0, gameArea.width, gameArea.height);// x, y, width, height
    },
    draw: function() {
        this.context.strokeStyle = "darkslategrey";
        this.context.lineWidth = 4;
        this.context.beginPath();
        this.context.moveTo(0, 164);
        this.context.lineTo(gameArea.width, 164);
        this.context.stroke();
    }
};

var rectangle = {
    height: 32,
    width: 32,
    jumping: true,
    x: gameArea.width/2, // center of the canvas
    xVelocity: 0,
    y: 0,
    yVelocity: 0,
    motion: {
        left: false,
        right: false,
        up: false,
        keyListener: function(event) {
            var keyState;
            if (event.type == "keydown") {
                keyState = true;
            }
            else {
                keyState = false;
            }

            if (event.keyCode == 37) { // left key
                rectangle.motion.left = keyState;  
            } else if (event.keyCode == 38) { // up key
                rectangle.motion.up = keyState;
            } else if (event.keyCode == 39) { // right key
                rectangle.motion.right = keyState;
            }
        }
    },
    update: function() {
        gameArea.context.fillStyle = "red";
        gameArea.context.fillRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
    }
};

var updateGameArea = function() {
    if (rectangle.motion.up && !rectangle.jumping) {
        rectangle.yVelocity -= 20;
        rectangle.jumping = true;
    }
    
    if (rectangle.motion.left) {
        rectangle.xVelocity -= 0.5;
    }
    
    if (rectangle.motion.right) {
        rectangle.xVelocity += 0.5;
    }

    rectangle.yVelocity += 1.5; // gravity
    rectangle.x += rectangle.xVelocity;
    rectangle.y += rectangle.yVelocity;
    rectangle.xVelocity *= 0.9; // friction
    rectangle.yVelocity *= 0.9; // friction

    // if rectangle is falling below floor line
    if (rectangle.y > gameArea.height - 16 - rectangle.height) {
        rectangle.jumping = false;
        rectangle.y = gameArea.height - 16 - rectangle.height;
        rectangle.yVelocity = 0;
    }

    // if rectangle is going off the left of the screen
    if (rectangle.x < -rectangle.width) {
        rectangle.x = gameArea.width;
    } else if (rectangle.x > gameArea.width) {// if rectangle goes past right boundary
        rectangle.x = -rectangle.width;
    }

    gameArea.clear();
    rectangle.update();
    gameArea.draw();
};