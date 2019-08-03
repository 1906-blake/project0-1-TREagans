const tableBody = document.querySelector('#tbl-body');
getUsername = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).username;
const getRole = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).role;

document.querySelector('#profileButton').innerText = getUsername;
const statusSearch = document.querySelector('.staffStatus');


if (!getUsername) {
    window.location = 'index.html';
}

function reimbursements() {
    
    if (getRole == "1" || getRole == "2") {
        // const reimLi = document.querySelector('#reimLi');
        // reimLi.classList.remove('staffStatusDisplay');
        
        const usersLi = document.querySelector('#playerLi');
        usersLi.classList.remove('staffStatusDisplay');

        const searchForm = document.querySelector('#searchForm');
        searchForm.classList.remove('staffStatus');

        const searchBtn = document.querySelector('#searchBtn');
        searchBtn.classList.remove('staffStatus');

        const statusDropdown = document.querySelector('#statusDropdown');
        statusDropdown.classList.remove('staffStatus');

        statusSearch.style.visibility = "visible";
        // staffStatusDisplay.style.display = "inline";
    }

    loadData();
};


function addRecordRow(record) {
    if (record <= 0) {
        return;
    }

    const row = document.createElement('tr');
    tableBody.appendChild(row);


    const usernameData = document.createElement('td');
    usernameData.innerText = record.author;
    row.appendChild(usernameData);


    const amountData = document.createElement('td');
    amountData.innerText = '$' + record.amount;
    row.appendChild(amountData);


    const submittedData = document.createElement('td');
    let formattedDate = new Date(record.dateSubmitted).toDateString();
    submittedData.innerText = formattedDate;
    row.appendChild(submittedData);


    const resolvedDateData = document.createElement('td');
    if(!record.dateResolved){
         resolvedDateData.innerText = '~';
    }else{
        let resolved = new Date(record.dateResolved).toDateString();
        resolvedDateData.innerText = resolved;
    }
    row.appendChild(resolvedDateData);
    

    const descriptionData = document.createElement('td');
    descriptionData.innerText = record.description;
    row.appendChild(descriptionData);


     const resolverNameData = document.createElement('td');
     if (!record.resolver) {
         resolverNameData.innerText = '~';
     } else {
         let resolverDate = record.resolver;
         resolverNameData.innerText = resolverDate;
     }
    row.appendChild(resolverNameData);


    const statusData = document.createElement('td');
    statusData.innerText = record.status;
    row.appendChild(statusData);

    
    const typeData = document.createElement('td');
    typeData.innerText = record.type;
    row.appendChild(typeData);


    const reimID = document.createElement('td');
    idBtn = document.createElement('button');
    const img = document.createElement('img');
    idBtn.innerText = record.reimbursement_id;
    img.setAttribute('type', 'button');
    img.setAttribute('src', '../public/imgs/edit.png');
    img.setAttribute('id', 'editReim');
    img.setAttribute('data-toggle', 'modal');
    img.setAttribute('data-target', '#updateModal');
    img.setAttribute('onclick', `updateReim(${JSON.stringify(record)})`);
    row.appendChild(reimID.appendChild(idBtn.appendChild(img)));
}

async function loadData() {
    const userId = JSON.parse(localStorage.getItem('user')).userId;
    const resp = await fetch(`http://localhost:8012/reimbursements/author/${userId}`, {
        credentials: 'include'
    });

    const records = await resp.json();

    if (records <= 0) {
        const recordsErr = document.querySelector('.recordsErrorMsg');
        recordsErr.innerText = 'You currently have no reimbursements to display.';
        return;
    } else {
        records.forEach(addRecordRow);
    }
};


async function logout() {
    localStorage.clear();

    window.location = 'login.html';
}













