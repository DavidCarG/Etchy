const gridContainer = document.querySelector('.grid');

let squareSize = 0;

function createGrid(gridSize){

    squareSize = setSquareSize(1.6);
    console.log(squareSize);
    for(let i=0;i<gridSize;i++){
        const row = document.createElement('div');
        row.classList.add('row');
        for(let j=0;j<gridSize;j++){
            const square = document.createElement('div');
            square.classList.add('square');
            square.style.cssText = `height : ${squareSize}px; width : ${squareSize}px;`;
            row.appendChild(square);
        }
        gridContainer.appendChild(row);
    }
}

function setSquareSize(controlerValue){
    let gridSize = Math.floor((controlerValue+16)*(controlerValue+4));
    return calcSize(Math.pow(gridSize,2));
}

function calcSize(nSquares){
    let height = 450;
    let width = 450;
    let area = 202500;
    var elementArea = parseInt(area / nSquares);

    // Calculate side length if there is no "spill":
    let sideLength = parseInt(Math.sqrt(elementArea));

    // We now need to fit the squares. Let's reduce the square size 
    // so an integer number fits the width.
    let numX = Math.ceil(width/sideLength);
    sideLength = width/numX;
    while (numX <= nSquares) {
        // With a bit of luck, we are done.
        if (Math.floor(height/sideLength) * numX >= nSquares) {
            // They all fit! We are done!
            return sideLength;
        }
        // They don't fit. Make room for one more square i each row.
        numX++;
        sideLength = width/numX;
    }
    // Still doesn't fit? The window must be very wide
    // and low.
    sideLength = height;
    return sideLength;
}

createGrid(98);
