const world = {
    width: 256,
    height: 256,
}

const board = [];
const boardVisualisation = new PIXI.Graphics();
let iteration = 0;

const nextInteration = function () {
    for(let y = 0; y < world.height; y++) {
        let row = []
        for(let x = 0; x < world.width; x++) {
            if(Math.random() < 0.5) {
            row.push(0);
            continue;
            }

            row.push(1);
        }

        board.push(row);
    }

    for(let y = 0; y < world.height; y++) {
        for(let x = 0; x < world.width; x++) {
            let colour = board[x][y] ? 0x008000 : 0xFF0000;
            boardVisualisation.lineStyle(1, colour, 1);
            boardVisualisation.moveTo(x, y);
            boardVisualisation.lineTo(x+1, y+1);
            boardVisualisation.x = 0;
            boardVisualisation.y = 0;
        }
    }

    iteration += 1;
}

nextInteration();

const renderer = PIXI.autoDetectRenderer(world.width, world.height);

document.body.appendChild(renderer.view);

const stage = new PIXI.Container();

stage.addChild(boardVisualisation)

var message = new PIXI.Text(
  iteration,
  {fontFamily: "sans-serif", fontSize: "32px", fill: "white"}
);

stage.addChild(message);

window.setInterval(function () {
    message.text = iteration;
    nextInteration();
    renderer.render(stage);
}, 1000);