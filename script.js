const gridContainer = document.querySelector('.grid');
let squareSize = 0;

function deleteGrid() {
    let g = document.querySelector(".grid");

    let child = g.lastElementChild; 
    while (child) {
        g.removeChild(child);
        child = g.lastElementChild;
    }
}

function createGrid(gSize){

    deleteGrid();

    for(let i=0;i<gSize;i++){
        const row = document.createElement('div');
        row.classList.add('row');
        for(let j=0;j<gSize;j++){
            const square = document.createElement('div');
            square.classList.add('square');
            square.style.cssText = `height : ${squareSize}px; width : ${squareSize}px;`;
            row.appendChild(square);
        }
        gridContainer.appendChild(row);
    }
}

//Square size options
const sizeOptions = [
    {
        "rValue": -3.2,
        "sideLength": 5
    },
    {
        "rValue": -2.8,
        "sideLength": 6
    },
    {
        "rValue": -2.5,
        "sideLength": 9
    },
    {
        "rValue": -2.2,
        "sideLength": 10
    },
    {
        "rValue": -1.9,
        "sideLength": 15
    },
    {
        "rValue": -1.6,
        "sideLength": 18
    },
    {
        "rValue": -1.3,
        "sideLength": 25
    },
    {
        "rValue": -1,
        "sideLength": 30
    },
    {
        "rValue": -0.7,
        "sideLength": 45
    },
    {
        "rValue": -0.4,
        "sideLength": 50
    },
    {
        "rValue": -0.1,
        "sideLength": 50
    },
    {
        "rValue": 0.2,
        "sideLength": 75
    },
    {
        "rValue": 0.5,
        "sideLength": 75
    },
    {
        "rValue": 0.8,
        "sideLength": 90
    },
    {
        "rValue": 1.1,
        "sideLength": 90
    },
    {
        "rValue": 1.4,
        "sideLength": 90
    },
    {
        "rValue": 1.7,
        "sideLength": 150
    },
    {
        "rValue": 2,
        "sideLength": 150
    },
    {
        "rValue": 2.3,
        "sideLength": 225
    },
    {
        "rValue": 2.6,
        "sideLength": 225
    },
    {
        "rValue": 2.9,
        "sideLength": 450
    },
    {
        "rValue": 3.2,
        "sideLength": 450
    }
];

function roundValue(value){
    value*=10;
    value = Math.floor(value);
    value = value/10;
    return value;
}

function findDiff(x,y){
    x = Math.abs(x);
    y = Math.abs(y);
    
    return Math.abs(x-y);
}

function setSquareSize(cValue){
    cValue = roundValue(cValue);
    squareSize = sizeOptions[0].sideLength;
    for(let i=0;i<23;i++){
        if(sizeOptions[i].rValue>cValue){
            if(i===0) 
                break;
            else{
                let leftDiff = findDiff(sizeOptions[i-1].rValue,cValue);
                let rightDiff = findDiff(sizeOptions[i].rValue,cValue);

                squareSize = (leftDiff>=rightDiff)?sizeOptions[i-1].sideLength:sizeOptions[i].sideLength;
                break;
            }

        }
    }
    let gridSize = 450/squareSize;
    createGrid(gridSize);

}

//Rotation stuff
let rotValue =0;
const rotate = (EL) => {
  
    let ang = 0; // All angles are expressed in radians
    let angStart = 0;
    let isStart = false;
  
    const angXY = (ev) => {
      const bcr = EL.getBoundingClientRect();
      const radius = bcr.width / 2;
      const { clientX, clientY } = ev.touches ? ev.touches[0] : ev;
      const y = clientY - bcr.top - radius;  // y from center
      const x = clientX - bcr.left - radius; // x from center
      return Math.atan2(y, x);
    };
  
    const mousedown = (ev) => {
      isStart = true;
      angStart = angXY(ev) - ang;
    };
    
    const mousemove = (ev) => {
      if (!isStart) return;
      let aXY = angXY(ev);
      ev.preventDefault();
      ang =  aXY - angStart;
      EL.style.transform = `rotateZ(${ang}rad)`;
      rotValue = aXY;
    };
  
    const mouseup = () => {
      isStart = false;
      let rValue = setSquareSize(rotValue);
    };
  
    EL.addEventListener("mousedown", mousedown);

    let controler = document.querySelector('.left-controler');

    controler.addEventListener("mousemove", mousemove);
    controler.addEventListener("mouseup", mouseup);
  
  };
  document.querySelectorAll(".rotate").forEach(rotate);

  //Grid painting
  function paintGrid(elem, color){    
    if(elem.buttons == 1){
        if(elem.target.classList == 'square'){
            let square = elem.target;    
            square.style.backgroundColor = color;
        }  
    }else{
        return;
    }
}

let selectedColor = 'black';

gridContainer.addEventListener('mousedown', event =>{ 
    paintGridEvent = paintGrid(event, selectedColor);
    console.log("Im here");
    if(event.buttons == 1){        
        window.addEventListener('mouseover', (e) => {
                paintGrid(e, selectedColor);          
        });
    }
});

