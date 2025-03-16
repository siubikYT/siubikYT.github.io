const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Player textures

window.playerIdle = new Image();
playerIdle.src = "Resources/Player/1 idle.png";

window.playerWalking = new Image();
playerWalking.src = "Resources/Player/1 walk.png";


// Forest textures

window.forest_textures = new Image();
forest_textures.src = "Resources/Environment/Forest/forest_textures.png";

const grass_flat1 = {
    sheet: forest_textures,
    x: 128,
    y: 48,
    width: 16,
    height: 16,
    collision: false,
};

const grass_flat2 = {
    sheet: forest_textures,
    x: 128,
    y: 80,
    width: 16,
    height: 16,
    collision: false,
};

const grass_flat3 = {
    sheet: forest_textures,
    x: 96,
    y: 80,
    width: 16,
    height: 16,
    collision: false,
};

const grass_flat4 = {
    sheet: forest_textures,
    x: 16,
    y: 16,
    width: 16,
    height: 16,
    collision: false,
};

const grass_flat5 = {
    sheet: forest_textures,
    x: 16,
    y: 64,
    width: 16,
    height: 16,
    collision: false,
};



const grass1 = {
    sheet: forest_textures,
    x: 128,
    y: 16,
    width: 16,
    height: 16,
    collision: false
};

const grass2 = {
    sheet: forest_textures,
    x: 64,
    y: 32,
    width: 16,
    height: 16,
    collision: false
};

const grass3 = {
    sheet: forest_textures,
    x: 48,
    y: 48,
    width: 16,
    height: 16,
    collision: false
};

const grass_edge_bottom1 = {
    sheet: forest_textures,
    x: 16,
    y: 32,
    width: 16,
    height: 16,
    collision: false
};

const grass_edge_bottom2 = {
    sheet: forest_textures,
    x: 16,
    y: 80,
    width: 16,
    height: 16,
    collision: false
};

const grass_edge_left1 = {
    sheet: forest_textures,
    x: 0,
    y: 16,
    width: 16,
    height: 16,
    collision: false
};

const grass_edge_left2 = {
    sheet: forest_textures,
    x: 0,
    y: 64,
    width: 16,
    height: 16,
    collision: false
};

const grass_edge_right1 = {
    sheet: forest_textures,
    x: 32,
    y: 16,
    width: 16,
    height: 16,
    collision: false
};

const grass_edge_right2 = {
    sheet: forest_textures,
    x: 32,
    y: 64,
    width: 16,
    height: 16,
    collision: false
};

const grass_edge_lefttop1 = {
    sheet: forest_textures,
    x: 0,
    y: 0,
    width: 16,
    height: 16,
    collision: false
};

const grass_edge_lefttop2 = {
    sheet: forest_textures,
    x: 0,
    y: 48,
    width: 16,
    height: 16,
    collision: false
};

const grass_edge_righttop1 = {
    sheet: forest_textures,
    x: 32,
    y: 0,
    width: 16,
    height: 16,
    collision: false
};

const grass_edge_righttop2 = {
    sheet: forest_textures,
    x: 32,
    y: 48,
    width: 16,
    height: 16,
    collision: false
};

const grass_edge_leftbottom1 = {
    sheet: forest_textures,
    x: 0,
    y: 32,
    width: 16,
    height: 16,
    collision: false
};

const grass_edge_leftbottom2 = {
    sheet: forest_textures,
    x: 0,
    y: 80,
    width: 16,
    height: 16,
    collision: false
};

const grass_edge_rightbottom1 = {
    sheet: forest_textures,
    x: 32,
    y: 32,
    width: 16,
    height: 16,
    collision: false
};

const grass_edge_rightbottom2 = {
    sheet: forest_textures,
    x: 32,
    y: 80,
    width: 16,
    height: 16,
    collision: false
};

// Stone textures

window.stone1 = new Image();
stone1.src = "Resources/Environment/Mining/stone_1.png";

window.stone2 = new Image();
stone2.src = "Resources/Environment/Mining/stone_2.png";

window.stone3 = new Image();
stone3.src = "Resources/Environment/Mining/stone_3.png";


// Copper textures

window.copper_bar = new Image();
copper_bar.src = "Resources/Environment/Mining/copper_bar.png";

window.copper_node = new Image();
copper_node.src = "Resources/Environment/Mining/copper_node.png";

window.copper_ore = new Image();
copper_ore.src = "Resources/Environment/Mining/copper_ore.png";


// Gold textures

window.gold_bar = new Image();
gold_bar.src = "Resources/Environment/Mining/gold_bar.png";

window.gold_node = new Image();
gold_node.src = "Resources/Environment/Mining/gold_node.png";

window.gold_ore = new Image();
gold_ore.src = "Resources/Environment/Mining/gold_ore.png";


// Mystrile textures

window.mystrile_bar = new Image();
mystrile_bar.src = "Resources/Environment/Mining/mystrile_bar.png";

window.mystrile_node = new Image();
mystrile_node.src = "Resources/Environment/Mining/mystrile_node.png";

window.mystrile_ore = new Image();
mystrile_ore.src = "Resources/Environment/Mining/mystrile_ore.png";


// Silver textures

window.silver_bar = new Image();
silver_bar.src = "Resources/Environment/Mining/silver_bar.png";

window.silver_node = new Image();
silver_node.src = "Resources/Environment/Mining/silver_node.png";

window.silver_ore = new Image();
silver_ore.src = "Resources/Environment/Mining/silver_ore.png";

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
const objects = [];

var mouse_x = 0;
var mouse_y = 0;

var hoverObjectIndex = -1;

let mapData = null;
let currentMap = null;


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

// Update the collision check to work with object properties
function checkCollision(objs) {
    objs.forEach(obj => {
        // Only process objects that should block movement.
        // For example, if the texture comes from a sheet and collision is false, skip it.
        if (obj.texture.hasOwnProperty("sheet") && obj.collision === false) return;

        // Check if the player is colliding with this object
        if (
            player_x < obj.x + obj.width &&
            player_x + FRAME_WIDTH > obj.x &&
            player_y < obj.y + obj.height &&
            player_y + FRAME_HEIGHT > obj.y
        ) {
            // Calculate overlaps on each side
            let overlapLeft = player_x + FRAME_WIDTH - obj.x;
            let overlapRight = obj.x + obj.width - player_x;
            let overlapTop = player_y + FRAME_HEIGHT - obj.y;
            let overlapBottom = obj.y + obj.height - player_y;

            let minOverlap = Math.min(overlapLeft, overlapRight, overlapTop, overlapBottom);

            // Adjust the player's position based on the smallest overlap
            if (minOverlap === overlapLeft) {
                player_x = obj.x - FRAME_WIDTH;
            } else if (minOverlap === overlapRight) {
                player_x = obj.x + obj.width;
            } else if (minOverlap === overlapTop) {
                player_y = obj.y - FRAME_HEIGHT;
            } else if (minOverlap === overlapBottom) {
                player_y = obj.y + obj.height;
            }
        }
    });
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

async function loadMap(mapName) {
    try {
        const response = await fetch(mapName);
        currentMap = await response.json();
        processMapObjects();
        console.log("Map loaded successfully");
    } catch (error) {
        console.error("Error loading map:", error);
    }
}

function processMapObjects() {
    objects.length = 0; // Clear existing objects

    currentMap.objects.forEach(obj => {
        if (!obj || obj.length < 7) {
            console.warn("Invalid object in map data:", obj);
            return;
        }

        // Destructure the JSON object with 7 values:
        // [x, y, width, height, textureData, layer, collision]
        const [x, y, width, height, textureData, layer, collision] = obj;
        const texture = resolveTexture(textureData);

        if (texture) {
            // Store as an object for clarity
            objects.push({ x, y, width, height, texture, layer, collision });
        }
    });

    // Sort objects based on the layer (if you still want to sort by rendering order)
    objects.sort((a, b) => a.layer - b.layer);
}

function resolveTexture(textureData) {
    if (typeof textureData === 'string') {
        const imageObj = window[textureData];
        if (imageObj instanceof HTMLImageElement) {
            return imageObj;
        } else {
            console.warn(`Image reference not found: ${textureData}`);
            return null;
        }
    }
    else if (textureData && typeof textureData === 'object' &&
        textureData.hasOwnProperty('x') && textureData.hasOwnProperty('y')) {
        const result = { ...textureData };

        if (typeof result.sheet === 'string') {
            const sheetObj = window[result.sheet];
            if (sheetObj instanceof HTMLImageElement) {
                result.sheet = sheetObj;
            } else {
                console.warn(`Sheet reference not found: ${result.sheet}`);
                return null;
            }
        }

        return result;
    }
    else {
        console.warn('Unknown or invalid texture format:', textureData);
        return null;
    }
}

function drawObjects() {
    hoverObjectIndex = -1;

    objects.forEach((obj, index) => {
        // Check for mouse overlap for highlighting
        if (
            mouse_x >= obj.x && mouse_x <= obj.x + obj.width &&
            mouse_y >= obj.y && mouse_y <= obj.y + obj.height
        ) {
            hoverObjectIndex = index;
        }

        try {
            // If the texture is defined as an object with a sprite sheet
            if (obj.texture.hasOwnProperty("sheet")) {
                const sheetImg = obj.texture.sheet;
                if (sheetImg instanceof HTMLImageElement) {
                    ctx.drawImage(
                        sheetImg,
                        obj.texture.x, obj.texture.y, obj.texture.width, obj.texture.height,
                        obj.x, obj.y, obj.width, obj.height
                    );
                } else {
                    console.warn(`Invalid sheet image at index ${index}`);
                }
            }
            // If the texture is a direct image reference
            else if (obj.texture instanceof HTMLImageElement) {
                ctx.drawImage(obj.texture, obj.x, obj.y, obj.width, obj.height);
            }
            else {
                console.warn(`Unrecognized texture format at index ${index}:`, obj.texture);
            }
        } catch (e) {
            console.error(`Error drawing object at index ${index}:`, e);
        }

        // Draw a highlight around the object if the mouse is over it
        if (index === hoverObjectIndex) {
            ctx.strokeStyle = 'rgba(0, 255, 0, 0.5)';
            ctx.lineWidth = 2;
            ctx.strokeRect(obj.x, obj.y, obj.width, obj.height);
        }
    });
}

function drawFrame() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawPlayer() {
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
    drawObjects();
    drawPlayer();
    requestAnimationFrame(gameLoop);
}

loadMap("Resources/Maps/mapalukas.json").then(() => {
    player_x = currentMap.playerStartX || 0;
    player_y = currentMap.playerStartY || 0;
    requestAnimationFrame(gameLoop);
});