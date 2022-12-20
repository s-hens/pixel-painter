//global elements
const pixelCanvas = document.getElementById("pixelCanvas");

let cellSize;

//open "new canvas" settings div
const openCanvasSettings = document.querySelector("#openCanvasSettings");
openCanvasSettings.addEventListener("click", canvasSettingsWindow);

const closeCanvasSettings = document.querySelector("#closeCanvasSettings");
closeCanvasSettings.addEventListener("click", canvasSettingsWindow);

const canvasSettings = document.getElementById("canvasSettings");

function canvasSettingsWindow() {
    if (canvasSettings.style.display == "block") {
        canvasSettings.style.display = "none";
    } else {
        canvasSettings.style.display = "block";
    }
}

//create new canvas
const newCanvasButton = document.querySelector("#newCanvasButton");

newCanvasButton.addEventListener("click", newCanvas);

function newCanvas() {
    //delete previous canvas
    pixelCanvas.textContent = ``;
    //determine canvas dimensions from user input
    let width = document.getElementById("width").value;
    let height = document.getElementById("height").value;
    let area = width * height;
    //determine cell size from user input
    //using JQuery!
    cellSize = $("input[type='radio'][name='cellSize']:checked").val();
    //apply canvas width to css grid
    timesToPrintAuto = Array(Number(width)).join("auto ");
    pixelCanvas.setAttribute("style", `grid-template-columns: ${timesToPrintAuto}auto;`);
    //generate cells
    for (let i = 0; i < area; i++) {
        const gridCell = document.createElement("div");
        gridCell.setAttribute("class", "gridCell");
        pixelCanvas.appendChild(gridCell);
        gridCell.setAttribute("style", `height: ${cellSize}px; width: ${cellSize}px;`);
    }
    //close "new canvas" settings div
    canvasSettings.style.display = "none";
}

//enforce maximum canvas size
//using JQuery!
$(document.querySelector("#width")).on("change keyup paste", enforceRange);

$(document.querySelector("#height")).on("change keyup paste", enforceRange);

function enforceRange() {
    if (this.value > 50) {
        this.value = 50;
    } else if (this.value < 2) {
        this.value = 2;
    }
}

//color picker
//using JQuery!
const colorPicker = document.getElementById("colorPicker");

const colorPickerDiv = document.getElementById("colorPickerDiv");
colorPickerDiv.style.backgroundColor = colorPicker.value;

$(colorPicker).on("click change", matchColor);

function matchColor() {
    colorPickerDiv.style.backgroundColor = colorPicker.value;
    draw();
}

//draw
//using JQuery!
function draw() {
    pixelCanvas.style.cursor = "url(./images/pencil-icon.png),auto";
    $(pixelCanvas).on("mousedown mouseover dragover", function(e) {
        let colorChoice = colorPicker.value;
        if (e.buttons == 1) {
            //prevent cursor from changing
            e.preventDefault();
            //paint cells
            e.target.setAttribute("style", `background-color: ${colorChoice}; height: ${cellSize}px; width: ${cellSize}px;`);
            pixelCanvas.style.cursor = "url(./images/pencil-icon.png),auto";
        };
    });
}

draw();

/*
//rainbow pen: randomised edition
//using JQuery!
const rainbowButton = document.querySelector("#rainbowButton");

rainbowButton.addEventListener("click", rainbowDraw);

const rainbowColors = ["#f06292", "#ffe082", "#c5e1a5", "#90caf9", "#b39ddb"];

function rainbowDraw() {
    pixelCanvas.style.cursor = "url(./images/pencil-icon.png),auto";
    $(pixelCanvas).on("mousedown mouseover dragover", function(e) {
        let randomColor = rainbowColors[Math.floor(Math.random() * 5)];
        if (e.buttons == 1) {
            //prevent cursor from changing
            e.preventDefault();
            //paint cells
            e.target.setAttribute("style", `background-color: ${randomColor}; height: ${cellSize}px; width: ${cellSize}px;`);
            pixelCanvas.style.cursor = "url(./images/pencil-icon.png),auto";
        };
    });
}
*/

//rainbow pen: ordered edition
//using JQuery!

const rainbowButton = document.querySelector("#rainbowButton");

rainbowButton.addEventListener("click", rainbowDraw);

const rainbowColors = ["FFADAD", "FFD6A5", "FDFFB6", "CAFFBF", "9BF6FF", "A0C4FF", "BDB2FF", "FFCBFF"];

let currentRainbowColor;

function rainbowDraw() {
    pixelCanvas.style.cursor = "url(./images/pencil-icon.png),auto";
    $(pixelCanvas).on("mousedown mouseover dragover", function(e) {
        //get first color from rainbow array
        currentRainbowColor = rainbowColors.shift();
        //then push that color to the back of the queue
        rainbowColors.push(`${currentRainbowColor}`);
        if (e.buttons == 1) {
            //prevent cursor from changing
            e.preventDefault();
            //paint cells
            e.target.setAttribute("style", `background-color: #${currentRainbowColor}; height: ${cellSize}px; width: ${cellSize}px;`);
            pixelCanvas.style.cursor = "url(./images/pencil-icon.png),auto";
        };
    });
}

//erase
//using JQuery!
const eraserButton = document.querySelector("#eraserButton");

eraserButton.addEventListener("click", erase);

function erase() {
    pixelCanvas.style.cursor = "url(./images/eraser-icon.png),auto";
    $(pixelCanvas).on("mousedown mouseover dragover", function(e) {
        if (e.buttons == 1) {
            //prevent cursor from changing
            e.preventDefault();
            //erase cells
            e.target.setAttribute("style", `background-color: #FFFFFF; height: ${cellSize}px; width: ${cellSize}px;`);
            pixelCanvas.style.cursor = "url(./images/eraser-icon.png),auto";
        };
    });
}

//toggle grid visibility
const toggleGridButton = document.querySelector("#toggleGridButton");

toggleGridButton.addEventListener("click", toggleGrid);

function toggleGrid() {
    //toggle icon on button
    if (toggleGridButton.innerHTML === (`<span class="material-icons-round md-24">grid_off</span> Toggle gridlines`)) {
        toggleGridButton.innerHTML = (`<span class="material-icons-round md-24">grid_on</span> Toggle gridlines`);
    } else {
        toggleGridButton.innerHTML = (`<span class="material-icons-round md-24">grid_off</span> Toggle gridlines`);
    }
    //toggle the actual gridlines
    pixelCanvas.childNodes.forEach(cell => cell.classList.toggle("gridBorderHidden"));
}

//save drawing
//using HTML2Canvas and FileSaver.js!
const saveButton = document.querySelector("#saveButton");

saveButton.addEventListener("click", saveCanvas);

function saveCanvas() {
    //delete previous png
    saveImageDiv.textContent = ``;
    //create new png and open 'save as' window in OS
    html2canvas(pixelCanvas).then(function (canvas) {
        canvas.toBlob(function(blob) {
            saveAs(blob, "masterpiece.png");
    })
});
}