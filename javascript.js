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

//"new canvas" tooltip
openCanvasSettings.addEventListener("mouseover", newToolTipDisplay);
openCanvasSettings.addEventListener("mouseout", newToolTipHide);

const newToolTip = document.getElementById("newToolTip");

function newToolTipDisplay() {
    newToolTip.style.display = "block";
}

function newToolTipHide() {
    newToolTip.style.display = "none";
}

//create new canvas and show the rest of the control panel
const restOfTheMenu = document.getElementById("restOfTheControlPanel");

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
    //show rest of the menu
    restOfTheMenu.style.display = "inline";
}

//enforce maximum canvas size
//using JQuery!
$(document.querySelector("#width")).on("mouseout", enforceRange);

$(document.querySelector("#height")).on("mouseout", enforceRange);

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

//"color picker" tooltip
const colorPickerDivWrapper = document.getElementById("colorPickerDivWrapper");
colorPickerDivWrapper.addEventListener("mouseover", colorPickerToolTipDisplay);
colorPickerDivWrapper.addEventListener("mouseout", colorPickerToolTipHide);

const colorPickerToolTip = document.getElementById("colorPickerToolTip");

function colorPickerToolTipDisplay() {
    colorPickerToolTip.style.display = "block";
}

function colorPickerToolTipHide() {
    colorPickerToolTip.style.display = "none";
}


//draw
//using JQuery!
const drawButton = document.querySelector("#drawButton");

drawButton.addEventListener("click", draw);

function draw() {
    //use custom cursor
    pixelCanvas.style.cursor = "url(./images/brush-icon.png),auto";
    //turn off other event handlers
    $(pixelCanvas).off("mousedown mouseover dragover");
    //turn on drawing event handler
    $(pixelCanvas).on("mousedown mouseover dragover", function drawClick(e) {
        let colorChoice = colorPicker.value;
        if (e.buttons == 1) {
            //prevent cursor from changing
            e.preventDefault();
            pixelCanvas.style.cursor = "url(./images/brush-icon.png),auto";
            //paint cells
            e.target.setAttribute("style", `background-color: ${colorChoice}; height: ${cellSize}px; width: ${cellSize}px;`);
        };
    });
}

draw();

//"draw" tooltip
drawButton.addEventListener("mouseover", drawToolTipDisplay);
drawButton.addEventListener("mouseout", drawToolTipHide);

const drawToolTip = document.getElementById("drawToolTip");

function drawToolTipDisplay() {
    drawToolTip.style.display = "block";
}

function drawToolTipHide() {
    drawToolTip.style.display = "none";
}

//rainbow pen
//using JQuery!
const rainbowButton = document.querySelector("#rainbowButton");

rainbowButton.addEventListener("click", rainbowDraw);

let rainbowColors = ["FFADAD", "FFD6A5", "FDFFB6", "CAFFBF", "9BF6FF", "A0C4FF", "BDB2FF", "FFCBFF"];

let currentRainbowColor;

function rainbowDraw() {
    //use custom cursor
    pixelCanvas.style.cursor = "url(./images/special-brush-icon.png),auto";
    //turn off other event handlers
    $(pixelCanvas).off("mousedown mouseover dragover");
    //turn on rainbow pen event handler
    $(pixelCanvas).on("mousedown mouseover dragover", function rainbowDrawClick(e) {
        if (e.buttons == 1) {
            //prevent cursor from changing
            e.preventDefault();
            pixelCanvas.style.cursor = "url(./images/special-brush-icon.png),auto";
            //get first color from rainbow array
            currentRainbowColor = rainbowColors.shift();
            //then push that color to the back of the queue
            rainbowColors.push(`${currentRainbowColor}`);
            //paint cells
            e.target.setAttribute("style", `background-color: #${currentRainbowColor}; height: ${cellSize}px; width: ${cellSize}px;`);
        };
    });
}

//"rainbow" tooltip
rainbowButton.addEventListener("mouseover", rainbowToolTipDisplay);
rainbowButton.addEventListener("mouseout", rainbowToolTipHide);

const rainbowToolTip = document.getElementById("rainbowToolTip");

function rainbowToolTipDisplay() {
    rainbowToolTip.style.display = "block";
}

function rainbowToolTipHide() {
    rainbowToolTip.style.display = "none";
}

//erase
//using JQuery!
const eraserButton = document.querySelector("#eraserButton");

eraserButton.addEventListener("click", erase);

function erase() {
    //use custom cursor
    pixelCanvas.style.cursor = "url(./images/eraser-icon.png),auto";
    //turn off other event handlers
    $(pixelCanvas).off("mousedown mouseover dragover");
    //turn on erase event handler
    $(pixelCanvas).on("mousedown mouseover dragover", function eraseClick(e) {
        if (e.buttons == 1) {
            //prevent cursor from changing
            e.preventDefault();
            pixelCanvas.style.cursor = "url(./images/eraser-icon.png),auto";
            //erase cells
            e.target.setAttribute("style", `background-color: #FFFFFF; height: ${cellSize}px; width: ${cellSize}px;`);
        };
    });
}

//"erase" tooltip
eraserButton.addEventListener("mouseover", eraseToolTipDisplay);
eraserButton.addEventListener("mouseout", eraseToolTipHide);

const eraseToolTip = document.getElementById("eraseToolTip");

function eraseToolTipDisplay() {
    eraseToolTip.style.display = "block";
}

function eraseToolTipHide() {
    eraseToolTip.style.display = "none";
}

//toggle grid visibility
const toggleGridButton = document.querySelector("#toggleGridButton");

toggleGridButton.addEventListener("click", toggleGrid);

function toggleGrid() {
    //toggle icon on button
    if (toggleGridButton.innerHTML === (`<span class="material-icons-round md-24">grid_off</span> Grid`)) {
        toggleGridButton.innerHTML = (`<span class="material-icons-round md-24">grid_on</span> Grid`);
    } else {
        toggleGridButton.innerHTML = (`<span class="material-icons-round md-24">grid_off</span> Grid`);
    }
    //toggle the actual gridlines
    pixelCanvas.childNodes.forEach(cell => cell.classList.toggle("gridBorderHidden"));
}

//"grid" tooltip
toggleGridButton.addEventListener("mouseover", gridToolTipDisplay);
toggleGridButton.addEventListener("mouseout", gridToolTipHide);

const gridToolTip = document.getElementById("gridToolTip");

function gridToolTipDisplay() {
    gridToolTip.style.display = "block";
}

function gridToolTipHide() {
    gridToolTip.style.display = "none";
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

//"save" tooltip
saveButton.addEventListener("mouseover", saveToolTipDisplay);
saveButton.addEventListener("mouseout", saveToolTipHide);

const saveToolTip = document.getElementById("saveToolTip");

function saveToolTipDisplay() {
    saveToolTip.style.display = "block";
}

function saveToolTipHide() {
    saveToolTip.style.display = "none";
}