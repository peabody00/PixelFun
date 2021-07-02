class Artwork{
    constructor(name,height,width,grid) {
        this.name = name,
        this.height = height,
        this.width = width,
        this.grid = grid
    }
}

function addTools() {
    const container = document.getElementById('tools-container')
    const html = `<h2>Choose Grid Size</h2>` +
    `<form id="sizePicker">` +
        `Grid Height:` +
        `<input type="number" id="inputHeight" name="height" min="1" value="10">` +
        `Grid Width:` +
        `<input type="number" id="inputWidth" name="width" min="1" value="10">` +
        `<input type="submit" id="submitButton">` +
    `</form>` +

    `<h2>Pick A Color</h2>` +
    `<input type="color" id="colorPicker">`;

    container.innerHTML = html
}