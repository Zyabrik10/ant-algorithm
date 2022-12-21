const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const height = canvas.height;
const width = canvas.width;

const q = Math.floor(width / 10);

const directions = ["up", "right", "down", "left"];

var count = 0;

var cells = [];
var antCells = [];

var direction = directions[count];
var b = 0;

function feild() {

    for (var i = 0; i < q; i++) {
        cells[i] = [];
        antCells[i] = [];
        for (var j = 0; j < q; j++) {
            cells[i][j] = 0;
            antCells[i][j] = 0;
        }
    }

    var mid1 = Math.floor(Math.random() * q + 1);
    var mid2 = Math.floor(Math.random() * q + 1);

    antCells[mid1][mid2] = 1;
}

feild();

function checkDiraction() {
    for (var i = 0; i < antCells.length; i++) {
        for (var j = 0; j < antCells[i].length; j++) {
            if (antCells[i][j] == 1) {

                if (cells[i][j] == 1) {

                    cells[i][j] = 0;
                    antCells[i][j] = 0;

                    if (direction == "up") antCells[checkMin(i) - 1][j] = 1;

                    if (direction == "right") antCells[i][checkPls(j) + 1] = 1;

                    if (direction == "down") antCells[checkPls(i) + 1][j] = 1;

                    if (direction == "left") antCells[i][checkMin(j) - 1] = 1;

                    direction = directions[checkIndexPls(count)];
                    if (count == 3) {
                        count = -1;
                    }
                    count++;
                    return;
                }

                if (cells[i][j] == 0) {

                    cells[i][j] = 1;
                    antCells[i][j] = 0;

                    if (direction == "up") antCells[checkMin(i) - 1][j] = 1;

                    if (direction == "right") antCells[i][checkPls(j) + 1] = 1;

                    if (direction == "down") antCells[checkPls(i) + 1][j] = 1;

                    if (direction == "left") antCells[i][checkMin(j) - 1] = 1;
                    direction = directions[checkIndexMin(count)];
                    if (count == 0) {
                        count = 4;
                    }
                    count--;
                    return;
                }
            }
        }
    }
}

function checkMin(i) {
    if (i <= 0) return q;
    else return i;
}

function checkPls(j) {
    if (j >= q - 1) return -1;
    else return j;
}

function checkIndexPls(count) {
    if (count == 4) return 0;
    else return count;
}

function checkIndexMin(count) {
    if (count <= -1) return 3;
    else return count;
}

function draw() {
    b++;
    if (b >= 100001) clearInterval(start);
    checkDiraction();
    for (var i = 0; i < antCells.length; i++) {
        for (var j = 0; j < antCells[i].length; j++) {
            if (antCells[i][j] == 1) {

                if (cells[i][j] == 0) {
                    ctx.fillStyle = "black";
                    ctx.fillRect(i * 10, j * 10, 10, 10);
                    return;
                }

                if (cells[i][j] == 1) {
                    ctx.fillStyle = "white";
                    ctx.fillRect(i * 10, j * 10, 10, 10);
                    return;
                }

            }
        }
    }
}

var start = setInterval(draw, 1);