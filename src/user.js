class User {
    constructor(id, username) {
        this.id = id
        this.username = username
    }
}

const userButton = document.getElementById('user-create')
const usernameInput = document.getElementById('username-input')
const loginButton = document.getElementById('user-login')
const loginInput = document.getElementById('username-login')
const loginHideButtons = document.getElementById('login-container')
const logoutButton = document.getElementById('logout-container')
const logoutInput = document.getElementById('logoutButton')
const userInfo = document.getElementById('user-info')

// CREATE USER

userButton.addEventListener('submit' , function(x){
	x.preventDefault()
    if (usernameInput.value == '') {
        alert("No username entered")
    } else {
        let username = usernameInput.value
        postUser(username)
        usernameInput.value = ""
    }
})

function postUser(username) {
    let user = {
        username: username
    }

    fetch(`${userService.endpoint}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({user: user})
    })
    .then(resp => resp.json())
    .then(data => console.log(data))
}

// LOGIN USER

loginButton.addEventListener('submit' , function(x){
	x.preventDefault()
    if (loginInput.value == '') {
        alert("No username entered")
    } else {
        let username = loginInput.value
        loginUser(username)
        loginInput.value = ""
    }
})

function loginUser(username) {
    let user = {
        username: username
    }

    fetch(`${userService.endpoint}/users-login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({user: user})
    })
    .then(resp => resp.json())
    .then(data => {
        currentUser = data
        hideLoginButtons()
        showLogoutButton()
        showSaveDeleteButtons()
        showUserInfo()
        console.log(data)
    })
}

// HIDE LOGIN BUTTONS
function hideLoginButtons() {
    loginHideButtons.style.display = "none"
}

// LOUGOUT BUTTON
function showLogoutButton() {
    logoutButton.style.display = "inline"
}

// LOGOUT USER
logoutButton.addEventListener("click", function(){
    currentUser = {}
    logoutButton.style.display = "none"
    loginHideButtons.style.display = "inline"
    hideSaveDeleteButtons()
    hideUserInfo()
    grid.innerHTML = ""
    artworkTitle.value = ""
})

// SHOW USER INFO
function showUserInfo() {
    
    const artList = currentUser.artworks
    const ul = document.createElement('ul')
    
    userInfo.style.display = "inline"
    userInfo.innerHTML = '<strong>Artwork:</strong>'
    userInfo.append(ul)
    artList.map(artwork => {
        userArtworkInfo(artwork)
    })
}

// RESHOW USER INFO
function userArtworkInfo(artwork) { 
    const ul = document.querySelector('ul')
    const li = document.createElement('li')
    li.addEventListener('click', function(x) {
        console.log(artwork.id)
        grid.innerHTML = " ";
        gridHeight.value = artwork.height
        gridWidth.value = artwork.width
        makeGrid()
        importArtwork(artwork)
    })

    li.innerText = `${artwork.name} - ${artwork.height} x ${artwork.width}`
    li.id = artwork.id
    ul.append(li)
}

// HIDE USER INFO
function hideUserInfo() {
    userInfo.style.display = "none"
    userInfo.innerHTML = ""
}