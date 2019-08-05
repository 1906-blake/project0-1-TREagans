function updateUser(record){
    
    console.log(record);
    // prepopulate ID and username
    document.querySelector('#updateId').value = record.userId;
    document.querySelector('#updateUser').value = record.username;
    document.querySelector('#updatePassword').value = record.password;
    document.querySelector('#updateFirst').value = record.firstName;
    document.querySelector('#updateLast').value = record.lastName;
    document.querySelector('#updateEmail').value = record.email;
    document.querySelector('#updateRole').value = record.role;
}


function updateUserRecord(event) {

    const upId = document.querySelector('#updateId').value;
    const upUser = document.querySelector('#updateUser').value;
    const upPass = document.querySelector('#updatePassword').value;
    const upFirst = document.querySelector('#updateFirst').value;
    const upLast = document.querySelector('#updateLast').value;
    const upEmail = document.querySelector('#updateEmail').value;
    const upRole = document.querySelector('#updateRole').value;

    // create a update object
    const updatedUser = {
        userId: upId,
        username: upUser,
        password: upPass,
        firstName: upFirst,
        lastName: upLast,
        email: upEmail,
        role: upRole
    }
    
    // hides modal if passwords match
    $('#updateUserModal').modal('hide');

    sendUpdatedData(updatedUser);
}


async function sendUpdatedData(user) {

    await fetch(`http://localhost:8012/users/${user.userId}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });

    alert('Player updated successfully!');
    window.location = './players.html'; // redirect
}