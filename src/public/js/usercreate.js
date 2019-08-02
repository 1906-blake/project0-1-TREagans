function createNewUser(event) {
    event.preventDefault();

    // grab data from all fields
    const newUsername = document.querySelector('#createUser').value;
    const newPassword1 = document.querySelector('#createPassword').value;
    const newPassword2 = document.querySelector('#createPassword2').value;
    const newFirst = document.querySelector('#createFirst').value;
    const newLast = document.querySelector('#createLast').value;
    const newEmail = document.querySelector('#createEmail').value;
    const newRole = document.querySelector('#createRole').value;

    if (newPassword1 === newPassword2) {

        // hides modal if passwords match
        $('#createUserModal').modal('hide');

        // create a new object
        const newUser = {
            username: newUsername, 
            password: newPassword1, 
            firstName: newFirst, 
            lastName: newLast, 
            email: newEmail, 
            role: newRole
        }

        sendNewUserData(newUser)

    } else {
        const passErr = document.querySelector('#passwordsErr');
        passErr.innerText = 'Passwords Must Match';
    }
}


async function sendNewUserData(user) {
    
    await fetch(`http://localhost:8012/users`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });

    window.location = './players.html'; // redirect
}