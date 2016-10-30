const world = {
    width: 128,
    height: 128,
}

const board = [];
const boardVisualisation = new PIXI.Graphics();
let iteration = 0;

const initializeBoard = function (board) {
    for(let y = 0; y < world.height; y++) {
        let row = []
        for(let x = 0; x < world.width; x++) {
            row.push(0);
        }

        board.push(row);
    }
}

const randomizeBoard = function (board) {
    for(let y = 0; y < world.height; y++) {
        let row = []
        for(let x = 0; x < world.width; x++) {
            if(Math.random() < 0.10) {
            board[x][y] = 1;
            continue;
            }

            board[x][y] = 0;
        }

        board.push(row);
    }
}

const countNeighbors = function (board, position) {
    var neighbors = 0;

    let leftLimit = position.x === 0 ? position.x : position.x - 1;
    let rightLimit = position.x === world.width ? world.width : position.x + 1;
    let upLimit = position.y === 0 ? position.y : position.y - 1;
    let downLimit = position.y === world.height ? world.height : position.y + 1;

    for(let y = upLimit; y <= downLimit; y++) {
        for(let x = leftLimit; x <= rightLimit; x++) {
            if(x === position.x && y === position.y) {
                continue;
            }
            
            if(board[x][y]) {
                neighbors +=1;
            }
        }
    }

    return neighbors;
}

const nextInteration = function () {
    var previousIterationBoard = JSON.parse(JSON.stringify(board));

    for(let y = 0; y < world.height; y++) {
        for(let x = 0; x < world.width; x++) {
            let neighbors = countNeighbors(board, {x: x, y: y});

            if(!previousIterationBoard[x][y] && neighbors === 3) {
                 board[x][y] = 1;
                 continue;
            }

            if(previousIterationBoard[x][y] && (neighbors < 2 || neighbors > 3)) {
                 board[x][y] = 0;
            }
        }
    }

    iteration += 1;
}

const drawBoard = function (boardVisualisation) {
    boardVisualisation.clear();

    for(let y = 0; y < world.height; y++) {
        for(let x = 0; x < world.width; x++) {
            let colour = board[x][y] ? 0x008000 : 0x000000;
            boardVisualisation.lineStyle(1, colour, 1);
            boardVisualisation.moveTo(x, y);
            boardVisualisation.lineTo(x+1, y+1);
            boardVisualisation.x = 0;
            boardVisualisation.y = 0;
        }
    }
};

initializeBoard(board);
randomizeBoard(board);

const renderer = PIXI.autoDetectRenderer(world.width, world.height);

document.body.appendChild(renderer.view);

const stage = new PIXI.Container();

stage.addChild(boardVisualisation)

var message = new PIXI.Text(
  iteration,
  {fontFamily: "sans-serif", fontSize: "32px", fill: "white"}
);

stage.addChild(message);

drawBoard(boardVisualisation);
renderer.render(stage);

window.setInterval(function () {
    nextInteration();
    message.text = iteration;
    drawBoard(boardVisualisation);
    renderer.render(stage);
}, 1000);