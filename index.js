document.addEventListener('DOMContentLoaded', function() {
    fetch('https://dummyjson.com/users')
        .then(response => response.json())
        .then(data => {
            populateDropdown(data.users);
        })
        .catch(error => {
            console.error('Error fetching data: ', error);
        });
});

function populateDropdown(users) {
    const dropdown = document.getElementById('user-dropdown');

    users.forEach(user => {
        let option = document.createElement('option');
        option.value = user.id;
        option.textContent = user.firstName;
        dropdown.appendChild(option);
    });

    dropdown.addEventListener('change', function() {
        const selectedId = this.value;
        fetchAndDisplayUser(selectedId);
    });
}

function fetchAndDisplayUser(selectedId) {
    fetch(`https://dummyjson.com/users/${selectedId}`)
        .then(response => response.json())
        .then(data => {
            populateTable([data]); // Display details of the selected user
        })
        .catch(error => {
            console.error('Error fetching user data: ', error);
        });
}

function populateTable(users) {
    const tableBody = document.getElementById('user-table').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; // Clear table content

    users.forEach(user => {
        let row = tableBody.insertRow();
        
        let cellId = row.insertCell(0);
        cellId.textContent = user.id;

        let cellFirstName = row.insertCell(1);
        cellFirstName.textContent = user.firstName;

        let cellLastName = row.insertCell(2);
        cellLastName.textContent = user.lastName;

        let cellBirthDate = row.insertCell(3);
        cellBirthDate.textContent = user.birthDate;

        let cellEmail = row.insertCell(4);
        cellEmail.textContent = user.email;

        let cellPostalCode = row.insertCell(5);
        cellPostalCode.textContent = user.address ? user.address.postalCode : 'N/A';

        let cellAddress = row.insertCell(6);
        if (user.address) {
            cellAddress.textContent = `${user.address.address}, ${user.address.city}, ${user.address.state}, ${user.address.postalCode}`;
        } else {
            cellAddress.textContent = 'N/A';
        }
    });
}
