const getUser = JSON.parse(localStorage.getItem('user'));

function createNew(event) {
    event.preventDefault();

    // set default values
    const createUser = getUser.userId;
    document.querySelector('#inputUsername').value = getUser.username;
    document.querySelector('#createStatus').value = 'Pending';

    // const currentDate = new Date().toDateString;
    // const currentDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    const amount = document.querySelector('#inputAmount').value;
    const createDescrip = document.querySelector('#textareaDescription').value;
    const createType = document.querySelector('#create-type').value;

    loadCreateData(createUser, amount, createDescrip, createType);
};


async function loadCreateData(author, amount, descript, type) {

    const reimbursement = {
        author,
        amount,
        description: descript,
        reimbursetype: type
    }


   await fetch(`http://localhost:8012/reimbursements/`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reimbursement)
    });

    window.location = './reimbursement.html'; // redirect
};