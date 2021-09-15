class User {
    constructor(id, username) {
        this.id = id
        this.username = username;
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

//CREATE USER

userButton.addEventListener('submit' , function(x){
	x.preventDefault();
    let username = usernameInput.value
    postUser(username)
    usernameInput.value = ""
});

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

//LOGIN USER

loginButton.addEventListener('submit' , function(x){
	x.preventDefault();
    let username = loginInput.value
    loginUser(username)
    loginInput.value = ""
});

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
        currentUser = data;
        hideLoginButtons();
        showLogoutButton();
        showSaveDeleteButtons();
        showUserInfo();
        console.log(data)
    })
}

//HIDE LOGIN BUTTONS
function hideLoginButtons() {
    loginHideButtons.style.display = "none";
}

//LOUGOUT BUTTON
function showLogoutButton() {
    logoutButton.style.display = "inline";
}

//LOGOUT USER
logoutButton.addEventListener("click", function(){
    currentUser = {}
    logoutButton.style.display = "none";
    loginHideButtons.style.display = "inline";
    hideSaveDeleteButtons()
    hideUserInfo()
})

// SHOW USER INFO
function showUserInfo() {
    
    const artList = currentUser.artworks
    const ol = document.createElement('ol')
    
    userInfo.style.display = "inline"
    userInfo.innerText = 'Artwork:'
    userInfo.append(ol)
    artList.map(artwork => {
        userArtworkInfo(artwork)
    })
}

// RESHOW USER INFO
function userArtworkInfo(artwork) { 
    const ol = document.querySelector('ol')
    const li = document.createElement('li')
    li.addEventListener('click', function(x) {
        console.log('Test')
    })
    li.innerText = `${artwork.name} - ${artwork.height} x ${artwork.width}`
    li.id = artwork.id
    ol.append(li)
}

// HIDE USER INFO
function hideUserInfo() {
    userInfo.style.display = "none"
    userInfo.innerHTML = ""
}

