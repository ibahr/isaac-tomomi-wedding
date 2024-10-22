const guestData = {
    "guest1": { name: "John Doe", canBringPlusOne: true },
    "guest2": { name: "Jane Smith", canBringPlusOne: false },
    "guest3": { name: "Mark Johnson", canBringPlusOne: true }
};

function loadGuestInfo() {
    const guestCode = document.getElementById('guest').value.toLowerCase();

    if (guestData[guestCode]) {
        document.getElementById('guest-name').textContent = guestData[guestCode].name;
        document.getElementById('rsvp-section').style.display = 'block';

        if (guestData[guestCode].canBringPlusOne) {
            document.getElementById('plus-one-section').style.display = 'block';
        } else {
            document.getElementById('plus-one-section').style.display = 'none';
        }
    } else {
        alert('Guest not found. Please enter the correct code.');
    }
}
