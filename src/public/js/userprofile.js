const editGetUser = JSON.parse(localStorage.getItem('user'));
getUsername = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).username;
getRole = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).role;


if (!getUsername) {
  window.location = 'index.html';
}


// get all form fields
let editId = document.querySelector('#editId');
let editUser = document.querySelector('#editUser');
let editPass = document.querySelector('#editPass');
let editFirst = document.querySelector('#editFirst');
let editLast = document.querySelector('#editLast');
let editEmail = document.querySelector('#editEmail');
let editRole = document.querySelector('#editRole');
let saveBtn = document.querySelector('#saveProfile');
let editBtn = document.querySelector('#editProfile');
document.querySelector('#profileButton').innerText = editGetUser.username;



function editUserProfile(event) {
    event.preventDefault();

    editId.value = editGetUser.userId;
    editUser.value = editGetUser.username;
    editFirst.value = editGetUser.firstName;
    editLast.value = editGetUser.lastName;
    editEmail.value = editGetUser.email;
    editRole.value = editGetUser.role;


}


function enableProfile() {

    // disable the form fields
    editUser.disabled = false;
    editPass.disabled = false;
    editFirst.disabled = false;
    editLast.disabled = false;
    editEmail.disabled = false;

    // enable save button, change color
    saveBtn.disabled = false;
    editBtn.disabled = true;
}


function disableProfile() {
    // disable the form fields
    editUser.disabled = true;
    editPass.disabled = true;
    editFirst.disabled = true;
    editLast.disabled = true;
    editEmail.disabled = true;

    // enable save button, change color
    saveBtn.disabled = true;
    editBtn.disabled = false;

     if (getRole == "1" || getRole == "2") {
         const reimLi = document.querySelector('#reimLi');
         reimLi.classList.remove('staffStatusDisplay');

         const usersLi = document.querySelector('#playerLi');
         usersLi.classList.remove('staffStatusDisplay');
    }
}


function submitProfileUpdates(event) {
    event.preventDefault();


    // grab data fields
    if (editPass.value === "") {

        editId = editId.value;
        editUser = editUser.value;
        editFirst = editFirst.value;
        editLast = editLast.value;
        editEmail = editEmail.value;
        editRole = editRole.value;

        // create user object
        const edittedUser = {
            userId: editId,
            username: editUser,
            firstName: editFirst,
            lastName: editLast,
            email: editEmail,
            role: editRole
        }

        saveProfileData(edittedUser);
        console.log(edittedUser);

    } else {

        editId = editId.value;
        editUser = editUser.value;
        editPass = editPass.value;
        editFirst = editFirst.value;
        editLast = editLast.value;
        editEmail = editEmail.value;

        // create user object
        const edittedUser = {
            userId: editId,
            username: editUser,
            password: editPass,
            firstName: editFirst,
            lastName: editLast,
            email: editEmail,
            role: editRole
        }

        saveProfileData(edittedUser);
    }
}


async function saveProfileData(user) {
    
    const res = await fetch(`http://localhost:8012/users/${editId}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });

    if (res.status === 200) {
        localStorage.setItem('user', JSON.stringify(user));

        disableProfile();
        alert('Profile updated successfully!');
    }
    
    window.location = './profile.html';
    
    
}