class Artwork{
    constructor(name,height,width,grid, user_id) {
        this.name = name,
        this.height = height,
        this.width = width,
        this.grid = grid
        this.user_id = user_id
    }
}

const artworkSaveButton = document.getElementById(`saveButton`)

artworkSaveButton.addEventListener('click', function(x) {
    let name = "Default"
    let height = grid.rows.length
    let firstRow = [...grid.rows][0]
    let width = [...firstRow.childNodes].length
    let userID = currentUser.id
    let artworkString = Array.from(grid.rows).map(element => {
        let cellArray = Array.from(element.childNodes).map(cell => {
            return cell.style.backgroundColor
        })
        return cellArray.join(";")
    });
    let finalString = artworkString.join(":")
    console.log(finalString)
})
