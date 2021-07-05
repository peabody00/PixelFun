class User {
    constructor(username) {
        this.username = username;
    }
}

const userButton = document.getElementById('user-create')
const usernameInput = document.getElementById('username-input')

userButton.addEventListener('submit' , function(x){
	x.preventDefault();
    let username = usernameInput.value
    postUser(username)
});

function postUser(username) {
    console.log(username)
    fetch(`${userService.endpoint}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'appilcation/json',
        },
        body: JSON.stringify({username: username})
    })
    .then(resp => resp.json())
    .then(data => console.log(data))
}