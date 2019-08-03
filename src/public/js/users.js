getUsername = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).username;
getRole = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).role;

document.querySelector('#profileButton').innerText = getUsername;
// statusSearch = document.querySelector('.staffStatus');


function users(event) {
    event.preventDefault();

    if (getRole == 1 || getRole == 2) {
        const reimLi = document.querySelector('#reimLi');
        reimLi.classList.remove('staffStatusDisplay');

        // const playerLi = document.querySelector('#playerLi');
        // playerLi.classList.remove('staffStatusDisplay');

        // const searchForm = document.querySelector('#searchForm');
        // searchForm.classList.remove('staffStatus');

        // const searchBtn = document.querySelector('#searchBtn');
        // searchBtn.classList.remove('staffStatus');

        // const statusDropdown = document.querySelector('#statusDropdown');
        // statusDropdown.classList.remove('staffStatus');

        // statusSearch.style.visibility = "visible";
        // staffStatusDisplay.style.display = "inline";
    }
    
    loadUserData();
}

function addUserRows(record) {

    if (!record) {
        return;
    }

    // construct table for returned records
    const row = document.createElement('tr');
    tableBody.appendChild(row);

    const usernameData = document.createElement('td');
    usernameData.innerText = record.username;
    row.appendChild(usernameData);
    
    const firstData = document.createElement('td');
    firstData.innerText = record.firstName;
    row.appendChild(firstData);

    const lastData = document.createElement('td');
    lastData.innerText = record.lastName;
    row.appendChild(lastData);

    const emailData = document.createElement('td');
    emailData.innerText = record.email;
    row.appendChild(emailData);

    const roleData = document.createElement('td');
    roleData.innerText = record.role;
    row.appendChild(roleData);

    const userId = document.createElement('td');
    idBtn = document.createElement('button');
    const icon = document.createElement('i');
    idBtn.innerText = record.userId;
    icon.classList.add('fas');
    icon.classList.add('fa-edit');
    icon.setAttribute('type', 'button');
    icon.setAttribute('id', 'editUserId');
    icon.setAttribute('data-toggle', 'modal');
    icon.setAttribute('data-target', '#updateUserModal');
    icon.setAttribute('onclick', `updateUser(${JSON.stringify(record)})`);
    row.appendChild(userId.appendChild(idBtn.appendChild(icon)));
}


async function loadUserData() {

    const res = await fetch('http://localhost:8012/users', {
        credentials: 'include'
    });

    // loop thru all returned records and call addUserRow
    // function on each element (record)
    const records = await res.json();
    records.forEach(addUserRows);
}