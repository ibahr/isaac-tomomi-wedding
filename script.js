// Guest database with individual group members and plus one settings
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

        // If guest is part of a group, display individual RSVPs
        if (guestInfo.guestNames) {
            const guestList = guestInfo.guestNames.map((name, index) => `
                <div class="individual-rsvp">
                    <h4>${name}</h4>
                    <label>
                        <input type="radio" name="attending_${index}" value="yes" required> Yes<br><span class="jp-text">はい</span>
                    </label>
                    <label>
                        <input type="radio" name="attending_${index}" value="no" required> No<br><span class="jp-text">いいえ</span>
                    </label>
                </div>
            `).join("");
            document.getElementById('guest-list').innerHTML = guestList;
            document.getElementById('guest-list-section').style.display = 'block';
        }

        // Check if the guest can bring a plus one
        if (guestInfo.canBringPlusOne) {
            document.getElementById('plus-one-section').style.display = 'block';
        } else {
            document.getElementById('plus-one-section').style.display = 'none';
        }
    } else {
        alert('Guest not found. Please enter the correct code.');
    }
}

// Capture and submit group RSVP responses
document.getElementById('rsvp-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const guestCode = document.getElementById('guest').value.toLowerCase();
    const guestInfo = guestData[guestCode];
    const responses = {};

    if (guestInfo.guestNames) {
        guestInfo.guestNames.forEach((name, index) => {
            const response = document.querySelector(`input[name="attending_${index}"]:checked`).value;
            responses[name] = response;
        });
    }

    // Plus one response
    if (guestInfo.canBringPlusOne) {
        const plusOneResponse = document.querySelector('input[name="plusone"]:checked').value;
        responses["Plus One"] = plusOneResponse === "yes" ? document.getElementById('plus-one-name').value : "No Plus One";
    }

    console.log(responses); // Here, you can handle the responses (send to server, email, etc.)
    alert('RSVP Submitted!');
});
