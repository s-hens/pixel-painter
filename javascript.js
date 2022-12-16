//global elements
const pixelCanvas = document.getElementById("pixelCanvas");

//open "new canvas" settings div
const openCanvasSettings = document.querySelector("#openCanvasSettings");

openCanvasSettings.addEventListener("click", canvasSettingsWindow);

function canvasSettingsWindow() {
    const canvasSettings = document.getElementById("canvasSettings");
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
    let cellSize = $("input[type='radio'][name='cellSize']:checked").val();
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

//draw
//using JQuery!
$(pixelCanvas).on("mousedown mouseover dragover", function(e) {
    let colorChoice = document.getElementById("colorPicker").value;
    if (e.buttons == 1 || e.buttons == 3) {
        e.target.setAttribute("style", `background-color: ${colorChoice};`);
    };
});

//toggle grid visibility
const toggleGridButton = document.querySelector("#toggleGridButton");

toggleGridButton.addEventListener("click", toggleGrid);

function toggleGrid() {
    //toggle icon on button
    if (toggleGridButton.innerHTML === (`<span class="material-icons-sharp md-24">grid_off</span> Toggle gridlines`)) {
        toggleGridButton.innerHTML = (`<span class="material-icons-sharp md-24">grid_on</span> Toggle gridlines`);
    } else {
        toggleGridButton.innerHTML = (`<span class="material-icons-sharp md-24">grid_off</span> Toggle gridlines`);
    }
    //toggle the actual gridlines
    pixelCanvas.childNodes.forEach(cell => cell.classList.toggle("gridBorderHidden"));
}

//save drawing
//using HTML2Canvas!
const saveButton = document.querySelector("#saveButton");

saveButton.addEventListener("click", saveCanvas);

function saveCanvas() {
    //delete previous png
    document.getElementById("saveImageDiv").textContent = ``;
    //create new png
    html2canvas(pixelCanvas).then(function (canvas) {
        document.getElementById("saveImageDiv").appendChild(canvas);
})
}