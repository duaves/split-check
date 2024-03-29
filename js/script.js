document.addEventListener('DOMContentLoaded', function () {
    const billForm = document.getElementById('billForm');
    const userList = document.getElementById('userList');
    const resetBtn = document.getElementById('resetBtn');

    // Function for recalculating shares and updating the user table
    function updateShares() {
        const usersCount = userList.children.length;
        const share = 100 / usersCount;

        // We update the shares of each user
        [...userList.children].forEach(row => {
            const shareCell = row.querySelector('.share');
            shareCell.textContent = share.toFixed(2) + '€';
        });
    }

    // Checking whether the saved data is in local storage
    if (localStorage.getItem('userList')) {
        userList.innerHTML = localStorage.getItem('userList');
        updateShares(); // Update shares when page loads
    }

    billForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');

        // Validation
        if (nameInput.value.trim() === '' || emailInput.value.trim() === '') {
            alert('Please fill out all fields');
            return;
        }

        // Send data to server
        const formData = new FormData();
        formData.append('name', nameInput.value);
        formData.append('email', emailInput.value);

        fetch('php/save_user.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const newRow = `
                    <tr>
                        <td>${nameInput.value}</td>
                        <td>${emailInput.value}</td>
                        <td class="share">${data.share}</td>
                    </tr>
                `;
                userList.insertAdjacentHTML('beforeend', newRow);

                // We save data in local storage
                localStorage.setItem('userList', userList.innerHTML);

                updateShares(); // Update shares after adding a new user

                nameInput.value = '';
                emailInput.value = '';
            } else {
                alert(data.message);
            }
        })
        .catch(error => console.error('Error:', error));
    });

    resetBtn.addEventListener('click', function () {
        userList.innerHTML = '';
        localStorage.removeItem('userList'); // Deleting saved data
        fetch('php/reset_users.php');
    });
});
