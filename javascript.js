const canvas = document.getElementById("canvas");

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