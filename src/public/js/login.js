let getUsername;
async function login(e) {
    e.preventDefault();

    // get the username and password from inputs
    const username = document.querySelector('#inputUsername').value;
    const password = document.querySelector('#inputPassword').value;

    // credentials object; key / value
    const credentials = {
        username,
        password
    }

    // connect to api and attempt login
    try {
        const res = await fetch('http://localhost:8012/users/login', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(credentials),
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        const user = await res.json();
        localStorage.setItem('user', JSON.stringify(user));
        getUsername = user.username;
        console.log(username);
        
        window.location = './reimbursement.html'; // redirect
    } catch (err) {
        console.log(err);

        // error message
        const errorMsg = document.querySelector('.errorMsg');
        errorMsg.innerText = 'Invalid Login';
    }
};