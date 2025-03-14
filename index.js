const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const playerIdle = new Image();
playerIdle.src = "Resources/Player/1 idle.png";

const playerWalking = new Image();
playerWalking.src = "Resources/Player/1 walk.png";

const FRAME_WIDTH = 16;
const FRAME_HEIGHT = 16;
const WALK_FRAME_COUNT = 4;
const IDLE_FRAME_COUNT = 2;
let currentFrame = 0;

var direction = "left";
var player_x = 0;
var player_y = 0;
var player_speed = 0.5;
var isMoving = false;

let lastFrameUpdate = 0;
const WALK_FRAME_INTERVAL = 250;
const IDLE_FRAME_INTERVAL = 500;

const keys = {};
const objects = [[32,0,16,16], [64,64,16,16]];

var mouse_x = 0;
var mouse_y = 0;

var hoverObjectIndex = -1;

addEventListener("click", mineObject);
addEventListener("mousemove", drawMouseOverlap);
addEventListener("keydown", startMovement);
addEventListener("keyup", stopMovement);

function startMovement(event) {
    keys[event.key] = true;
    isMoving = true;
}

function stopMovement(event) {
    keys[event.key] = false;
    if (!keys["w"] && !keys["a"] && !keys["s"] && !keys["d"]) {
        isMoving = false;
        currentFrame = 0;
    }
}

function checkBoundaries() {
    if (player_x < 0) player_x = 0;
    if (player_x > canvas.width - FRAME_WIDTH) player_x = canvas.width - FRAME_WIDTH;
    if (player_y < 0) player_y = 0;
    if (player_y > canvas.height - FRAME_HEIGHT) player_y = canvas.height - FRAME_HEIGHT;
}

function checkCollision(objs) {
    for (let i = 0; i < objs.length; i++) {
        let objX = objs[i][0], objY = objs[i][1];
        let objW = objs[i][2], objH = objs[i][3];

        if (player_x < objX + objW &&
            player_x + FRAME_WIDTH > objX &&
            player_y < objY + objH &&
            player_y + FRAME_HEIGHT > objY) {

            let overlapLeft = player_x + FRAME_WIDTH - objX;
            let overlapRight = objX + objW - player_x;
            let overlapTop = player_y + FRAME_HEIGHT - objY;
            let overlapBottom = objY + objH - player_y;

            let minOverlap = Math.min(overlapLeft, overlapRight, overlapTop, overlapBottom);

            if (minOverlap === overlapLeft) {
                player_x = objX - FRAME_WIDTH;
            } else if (minOverlap === overlapRight) {
                player_x = objX + objW;
            } else if (minOverlap === overlapTop) {
                player_y = objY - FRAME_HEIGHT;
            } else if (minOverlap === overlapBottom) {
                player_y = objY + objH;
            }
        }
    }
}

function mineObject(event) {
    if (hoverObjectIndex >= 0 && event) {
        objects.splice(hoverObjectIndex, 1);
        hoverObjectIndex = -1;
    }
}

function movement() {
    if (keys["w"]) {
        direction = "up";
        player_y -= player_speed;
    }

    if (keys["s"]) {
        direction = "down";
        player_y += player_speed;
    }

    if (keys["a"]) {
        direction = "left";
        player_x -= player_speed;
    }
    if (keys["d"]) {
        direction = "right";
        player_x += player_speed;
    }

    checkCollision(objects);
    checkBoundaries();

}

function drawMouseOverlap(event) {
    const real_pos = canvas.getBoundingClientRect();

    mouse_x = event.clientX - real_pos.left;
    mouse_y = event.clientY - real_pos.top;

}

function drawFlippedImage(spriteSheet, frameX, frameY, frameWidth, frameHeight, posX, posY, flipX, flipY) {
    ctx.save();

    ctx.translate(posX + (flipX ? frameWidth : 0), posY + (flipY ? frameHeight : 0));

    ctx.scale(flipX ? -1 : 1, flipY ? -1 : 1);

    ctx.drawImage(
        spriteSheet,
        frameX, frameY, frameWidth, frameHeight,
        0, 0, frameWidth, frameHeight
    );

    ctx.restore();

}

function  updateAnimation(timestamp) {
    let interval = isMoving ? WALK_FRAME_INTERVAL : IDLE_FRAME_INTERVAL;

    if (timestamp - lastFrameUpdate >= interval) {
        lastFrameUpdate = timestamp;

        if (isMoving) {
            currentFrame = (currentFrame + 1) % WALK_FRAME_COUNT;
        } else {
            currentFrame = (currentFrame + 1) % IDLE_FRAME_COUNT;
        }
    }
}

function drawObjects(objs) {
    hoverObjectIndex = -1;

    for (let i = 0; i < objs.length; i++) {
        let objX = objs[i][0], objY = objs[i][1];
        let objW = objs[i][2], objH = objs[i][3];


        if (mouse_x < objX + objW && mouse_x >= objX &&
            mouse_y < objY + objW && mouse_y >= objY) {
            hoverObjectIndex = i;
            console.log(hoverObjectIndex);
            ctx.fillStyle = "purple";
        } else {
            ctx.fillStyle = "white";
        }

        ctx.fillRect(objX, objY, objW, objH);
    }
}

function drawFrame() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let spriteSheet = isMoving ? playerWalking : playerIdle;
    let frameX = 0;

    if (direction === "down") frameX = 0;
    if (direction === "up") frameX = 16;
    if (direction === "left") frameX = 32;
    if (direction === "right") frameX = 32;

    if (direction === "left") {
        drawFlippedImage(spriteSheet, frameX, currentFrame * FRAME_HEIGHT, FRAME_WIDTH, FRAME_HEIGHT, player_x, player_y, true, false);
    } else {
        ctx.drawImage(spriteSheet, frameX, currentFrame * FRAME_HEIGHT, FRAME_WIDTH, FRAME_HEIGHT, player_x, player_y, FRAME_WIDTH, FRAME_HEIGHT);
    }

}

function gameLoop(timestamp) {
    movement();
    updateAnimation(timestamp);
    drawFrame();
    drawObjects(objects);
    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);