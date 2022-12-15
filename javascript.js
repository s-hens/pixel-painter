//global elements
const canvas = document.getElementById("canvas");

//open "new canvas" settings popup
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
    //delete old canvas
    canvas.textContent = ``;
    //determine canvas dimensions from user input
    let width = document.getElementById("width").value;
    let height = document.getElementById("height").value;
    let cellSize = document.getElementById("cellSize").value;
    let area = width * height;
    //apply canvas width to css grid
    timesToPrintAuto = Array(Number(width)).join("auto ");
    canvas.setAttribute("style", `grid-template-columns: ${timesToPrintAuto}auto;`);
    //generate cells
    for (let i = 0; i < area; i++) {
        const gridCell = document.createElement("div");
        gridCell.setAttribute("class", "gridCell");
        canvas.appendChild(gridCell);
        gridCell.setAttribute("style", `height: ${cellSize}px; width: ${cellSize}px;`);
    }
}

//draw
//using JQuery!
$(canvas).on("mousedown mouseover dragover", function(e) {
    let colorChoice = document.getElementById("colorPicker").value;
    if (e.buttons == 1 || e.buttons == 3) {
        e.target.setAttribute("style", `background-color: ${colorChoice};`);
    };
});

//toggle grid visibility
const toggleGridButton = document.querySelector("#toggleGridButton");

toggleGridButton.addEventListener("click", toggleGrid);

function toggleGrid() {
    canvas.childNodes.forEach(cell => cell.classList.toggle("gridBorderHidden"));
}