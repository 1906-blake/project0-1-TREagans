const roleId = JSON.parse(localStorage.getItem('user')).role;
const status = document.querySelector('#statusDropdown');

function byStatus(event) {
    event.preventDefault();
    
    // if (status === 4) {
    //     alert('Invalid Selection!');
    //     return;
    // } else {
        console.log(status.value);
        tableBody.innerText = '';
        loadDataByStatus(status.value);
    // }
};

// we build out each table cell
function addRecordRowByStatus(record) {
    if (!record) {
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
    if (!record.dateResolved) {
        resolvedDateData.innerText = '~';
    } else {
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

async function loadDataByStatus(statusId) {
    const res = await fetch(`http://localhost:8012/reimbursements/status/${statusId}`, {
        credentials: 'include'
    });

    const records = await res.json();

    const recordsErr = document.querySelector('.recordsErrorMsg');
    if (records <= 0) {
      recordsErr.innerText =
        'You currently have no reimbursements to display.';
      return;
    } else {
      recordsErr.innerText = '';
      records.forEach(addRecordRowByStatus);
    }
    
};
