const updateUser = JSON.parse(localStorage.getItem('user'));
const currentId = document.querySelector('#updateId');
const username = document.querySelector('#updateUsername');
const currentAmount = document.querySelector('#updateAmount');
const currentDescription = document.querySelector('#updateDescription');
const currentStatus = document.querySelector('#updateStatus');
const currentType = document.querySelector('#updateType');
const updateModalBtn = document.querySelector('#updateReimBtn');
const resolveDate = new Date();
const userId = updateUser.userId;


function updateReim(record) {

    // make fields edittable
    currentAmount.disabled = false;
    currentDescription.disabled = false;
    currentType.disabled = false;


    // set the ID and username form fields
    currentId.value = record.reimbursement_id;
    username.value = updateUser.username;


    // disable update modal or not
    if (record.status == 'Approved' || record.status == 'Denied') {
        currentAmount.disabled = true;
        currentDescription.disabled = true;
        currentType.disabled = true;
        currentStatus.disabled = true;
        updateModalBtn.disabled = true;
    } else {
        updateModalBtn.disabled = false;
    }
    
    // disable status if not admin or finance-man
    console.log(updateUser.role);


    currentAmount.value = record.amount;
    currentDescription.value = record.description;
    currentStatus.value = record.status;
    currentType.value = record.type;
}

function update(event) {
    event.preventDefault();

    const reimId = document.querySelector('#updateId').value;
    let updateAmount = currentAmount.value;
    let updateDescription = currentDescription.value;
    let updatedStatus = currentStatus.value;
    let updatedType = currentType.value;


    // converting status back into a integer for storing in db
    if (updatedStatus === 'Approved') {
        updatedStatus = 1;
    } else if (updatedStatus === 'Denied') {
        updatedStatus = 2;
    } else if (updatedStatus === 'Pending') {
        updatedStatus = 3;
    }


    // converting type back into a integer for storing in db
    if (updatedType === 'Food') {
        updatedType = 1;
    } else if (updatedType === 'Lodging') {
        updatedType = 2;
    } else if (updatedType === 'Travel') {
        updatedType = 3;
    } else if (updatedType === 'Other') {
        updatedType = 4;
    }


    // if status has been updated, set resolve date and resolver
    if (updatedStatus === 1 || updatedStatus === 2) {
        updatedResolver = updateUser.username;

        // create an object
        const newUpdate = {
            reimbursementId: reimId,
            amount: updateAmount,
            dateResolved: resolveDate,
            description: updateDescription,
            resolver: userId,
            status: updatedStatus,
            reimbursetype: updatedType
        }

        updateData(newUpdate);
    } else {

       // create an object
       const newUpdate = {
           reimbursementId: reimId,
           amount: updateAmount,
           description: updateDescription,
           status: updatedStatus,
           reimbursetype: updatedType
       }

       updateData(newUpdate);
    }
}

async function updateData(user) {

            console.log('user:', user);

    const res = await fetch('http://localhost:8012/reimbursements/', {
        method: 'PATCH',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });

    if (res.status === 200) {
        // localStorage.setItem('user', JSON.stringify(user));
        alert('Reimbursement updated successfully!');
    }

    window.location = './reimbursement.html'; // redirect
}