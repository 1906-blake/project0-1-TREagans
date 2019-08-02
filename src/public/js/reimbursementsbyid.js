function reimbursementsById(event) {
    event.preventDefault();
    const authorId = document.querySelector('#textAuthorId').value;
    tableBody.innerText = '';
    loadDataById(authorId);
};

// we build out each table cell
function addRecordRowById(record) {
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
    const icon = document.createElement('i');
    idBtn.innerText = record.reimbursement_id;
    icon.classList.add('fas');
    icon.classList.add('fa-edit');
    icon.setAttribute('type', 'button');
    icon.setAttribute('id', 'editReim');
    icon.setAttribute('data-toggle', 'modal');
    icon.setAttribute('data-target', '#updateModal');
    icon.setAttribute('onclick', `updateReim(${JSON.stringify(record)})`);
    row.appendChild(reimID.appendChild(idBtn.appendChild(icon)));
}

async function loadDataById(authorId) {
    const res = await fetch(`http://localhost:8012/reimbursements/author/${authorId}`, {
        credentials: 'include'
    });

    const records = await res.json();
    records.forEach(addRecordRowById);
};