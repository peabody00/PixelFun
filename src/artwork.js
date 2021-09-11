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
const artworkInfo = document.getElementById(`artwork-info`)
const artworkTitle = document.getElementById(`artworkTitle`)

//SHOW SAVE AND DELETE BUTTONS
function showSaveDeleteButtons() {
    artworkInfo.style.display = "inline";
}

//HiDE SAVE AND DELETE BUTTONS
function hideSaveDeleteButtons() {
    artworkInfo.style.display = "none";
}

//SAVE ARTWORK
artworkSaveButton.addEventListener('click', function(x) {
    let name = artworkTitle.value
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
    saveArtwork(name, height, width, finalString, userID)
})

function saveArtwork(name, height, width, finalString, userID) {
    console.log(name)
    console.log(height)
    console.log(width)
    console.log(finalString)
    console.log(userID)

    // fetch(`not sure what goes here`, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({user: user,})
    // })
    //     .then(resp => resp.json())
    //     .then(data => console.log(data))
}
