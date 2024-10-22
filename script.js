// Guest database with group options and plus one settings
const guestData = {
    "group1": { 
        name: "The Smith Family", 
        guestNames: ["John Smith", "Jane Smith", "Alice Smith"], 
        canBringPlusOne: false,
        message: "We are excited to have the whole Smith family join us!"
    },
    "guest2": { 
        name: "Mark Johnson", 
        guestNames: null, 
        canBringPlusOne: true, 
        message: "You can bring a plus one!"
    },
    "guest3": { 
        name: "Jane Doe", 
        guestNames: null, 
        canBringPlusOne: false, 
        message: "We are excited to have you join us!"
    }
};

function loadGuestInfo() {
    const guestCode = document.getElementById('guest').value.toLowerCase();

    if (guestData[guestCode]) {
        const guestInfo = guestData[guestCode];
        document.getElementById('guest-name').textContent = guestInfo.name;
        document.getElementById('custom-message').textContent = guestInfo.message;
        document.getElementById('rsvp-section').style.display = 'block';

        // Check if the guest can bring a plus one
        if (guestInfo.canBringPlusOne) {
            document.getElementById('plus-one-section').style.display = 'block';
        } else {
            document.getElementById('plus-one-section').style.display = 'none';
        }

        // Display named guests if applicable
        if (guestInfo.guestNames) {
            const guestList = guestInfo.guestNames.map(name => `<li>${name}</li>`).join("");
            document.getElementById('guest-list').innerHTML = guestList;
            document.getElementById('guest-list-section').style.display = 'block';
        } else {
            document.getElementById('guest-list-section').style.display = 'none';
        }
    } else {
        alert('Guest not found. Please enter the correct code.');
    }
}