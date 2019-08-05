
function userByRole(event) {
    event.preventDefault();

    const roleOption = document.querySelector('#userRoleDropdown').value;

    if (roleOption === 7) {
        return;
    } else {
        tableBody.innerText = '';
        loadUserByRoleData(roleOption);
    } 
}


function usersByRole(record) {

    console.log(record);
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
    if (record.role == 1) {
       roleData.innerText = 'Admin'; 
    } else if (record.role == 2) {
        roleData.innerText = 'Finance-Manager';
    } else if (record.role == 3) {
        roleData.innerText = 'Employee';
    }
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


async function loadUserByRoleData(roleId) {

    const res = await fetch(`http://localhost:8012/users/role/${roleId}`, {
        credentials: 'include'
    });

    const records = await res.json();
    records.forEach(usersByRole);
}