class User {
    constructor(username) {
        this.username = username;
    }
}

const userButton = document.getElementById('user-create')
const usernameInput = document.getElementById('username-input')
const loginButton = document.getElementById('user-login')
const loginInput = document.getElementById('username-login')

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
    console.log(username)
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
    .then(data => console.log(data))
}