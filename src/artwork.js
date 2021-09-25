class Artwork{
    constructor(primaryKey, name, height, width, grid, user_id) {
        this.primaryKey = primaryKey,
        this.name = name,
        this.height = height,
        this.width = width,
        this.grid = grid,
        this.user_id = user_id
    }
}

const artworkSaveButton = document.getElementById(`saveButton`)
const artworkUpdateButton = document.getElementById(`updateButton`)
const artworkdeleteButton = document.getElementById(`deleteButton`)
const artworkInfo = document.getElementById(`artwork-info`)
const artworkTitle = document.getElementById(`artworkTitle`)

let currentArtwork = {}

// SHOW SAVE AND DELETE BUTTONS
function showSaveDeleteButtons() {
    artworkInfo.style.display = "inline"
    hideUpdateShowSaveButton()
}

// HIDE SAVE AND DELETE BUTTONS
function hideSaveDeleteButtons() {
    artworkInfo.style.display = "none"
}

// HIDE UPDATE AND SHOW SAVE BUTTON
function hideUpdateShowSaveButton() {
    artworkUpdateButton.style.display = "none"
    artworkSaveButton.style.display = "inline"
}

// SAVE ARTWORK
artworkSaveButton.addEventListener('click', function(x) {
    if (grid.innerHTML === "" || grid.innerHTML === " ") {
        alert('No Design Canvas')
        return
    }

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

    if (name === "") {
        alert('Title of artwork cannot be blank.')
    } else {
        saveArtwork(name, height, width, finalString, userID)
    }
})

// SAVES ARTWORK TO DATABASE

function saveArtwork(name, height, width, finalString, userID) {
    let artwork = {
        name: name,
        height: height,
        width: width,
        grid: finalString,
        user_id: userID,
    }

    fetch(`${userService.endpoint}/artworks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({artwork: artwork})
    })
        .then(resp => resp.json())
        .then(data => {
            let artwork1 = new Artwork(data.id, data.name, data.height, data.width, data.grid, data.user_id)
            userArtworkInfo(data)
            currentArtwork = data
            console.log(artwork1)

        })
        artworkSaveButton.style.display = "none"
        artworkUpdateButton.style.display = "inline"
}

// LOAD ARTWORK

function importArtwork(artwork) {
    let rows = artwork.grid.split(":")

    for (let i = 0; i < rows.length; i++){
        const rowData = rows[i].split(";")
        for (let j = 0; j < rowData.length; j++){
            grid.rows[i].cells[j].style.backgroundColor = rowData[j]
        }
    }
    setArtworkName(artwork)
    currentArtwork = artwork
}

function setArtworkName (artwork) {
    artworkTitle.value = artwork.name
    artworkSaveButton.style.display = "none"
    artworkUpdateButton.style.display = "inline"

}

// UPDATE ARTWORK

artworkUpdateButton.addEventListener('click', function(x) {
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
    })
    
    let finalString = artworkString.join(":")

    if (name === "") {
        alert('Title of artwork cannot be blank.')
    } else {
        updateArtwork(name, height, width, finalString, userID)
    }
})

function updateArtwork(name, height, width, finalString, userID) {
    let artwork = {
        name: name,
        height: height,
        width: width,
        grid: finalString,
        user_id: userID,
    }

    fetch(`${userService.endpoint}/artworks/${currentArtwork.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({artwork: artwork})
    })
        .then(resp => resp.json())
        .then(data => {
            let artwork1 = new Artwork(data.id, data.name, data.height, data.width, data.grid, data.user_id)
            let removeLI = document.getElementById(`${data.id}`) 
            removeLI.remove()
            userArtworkInfo(data)
            console.log(artwork1)
        })
}

// DELETE ARTWORK

artworkdeleteButton.addEventListener('click', function(x) {
    let prompt = confirm('Are you sure you want to delete this artwork?')

    if (prompt == true){
        fetch(`${userService.endpoint}/artworks/${currentArtwork.id}`, {
            method: 'DELETE',
            // headers: {
            //     'Content-Type': 'application/json',
            // },
            // body: JSON.stringify({artwork: artwork})
        })
            .then(resp => resp.json())
            .then(function(data) {
                clearAfterDelete()
                alert(`${currentArtwork.name} was deleted`)
                let removeLI = document.getElementById(`${data.id}`) 
                removeLI.remove()
            })
    } else {
        return
    }        
})

// DELETE - CLEAR GRID AND TITLE

function clearAfterDelete() {
    grid.innerHTML = ""
    artworkTitle.value = ""
}