const tableBody = document.querySelector('#tbl-body');

function users() {
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