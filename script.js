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


    const guestInfo = guestData[guestCode];
    document.getElementById('guest-name').textContent = guestInfo.name;
    document.getElementById('custom-message').textContent = guestInfo.message;
    document.getElementById('rsvp-section').style.display = 'block';

    // Clear previous guest list
    const guestListContainer = document.getElementById('guest-list');
    guestListContainer.innerHTML = ''; // Clear the list first

    // Display individual RSVPs for group members
    if (guestInfo.guestNames) {
        guestInfo.guestNames.forEach((name, index) => {
            const individualRsvpDiv = document.createElement('div');
            individualRsvpDiv.classList.add('individual-rsvp');
        
            const nameHeader = document.createElement('h4');
            nameHeader.textContent = name;
            individualRsvpDiv.appendChild(nameHeader);
        
            // Create the 'Yes' radio button and label
            const yesLabel = document.createElement('label');
            const yesRadio = document.createElement('input');
            yesRadio.setAttribute('type', 'radio');
            yesRadio.setAttribute('name', `attending_${index}`);
            yesRadio.setAttribute('value', 'yes');
            yesRadio.required = true;  // Ensure the radio is required
            yesLabel.appendChild(yesRadio);  // Append the radio to the label
            yesLabel.appendChild(document.createTextNode(' Yes'));  // Add the text 'Yes'
            const yesSpan = document.createElement('span');
            yesSpan.classList.add('jp-text');
            yesSpan.textContent = 'はい';  // Add the Japanese equivalent
            yesLabel.appendChild(yesSpan);
        
            individualRsvpDiv.appendChild(yesLabel);
        
            // Create the 'No' radio button and label
            const noLabel = document.createElement('label');
            const noRadio = document.createElement('input');
            noRadio.setAttribute('type', 'radio');
            noRadio.setAttribute('name', `attending_${index}`);
            noRadio.setAttribute('value', 'no');
            noRadio.required = true;  // Ensure the radio is required
            noLabel.appendChild(noRadio);  // Append the radio to the label
            noLabel.appendChild(document.createTextNode(' No'));  // Add the text 'No'
            const noSpan = document.createElement('span');
            noSpan.classList.add('jp-text');
            noSpan.textContent = 'いいえ';  // Add the Japanese equivalent
            noLabel.appendChild(noSpan);
        
            individualRsvpDiv.appendChild(noLabel);
        
            // Append the whole div for this guest to the guest list container
            guestListContainer.appendChild(individualRsvpDiv);
        });

        document.getElementById('guest-list-section').style.display = 'block';
    }

    // Show plus one option if applicable
    if (guestInfo.canBringPlusOne) {
        document.getElementById('plus-one-section').style.display = 'block';
    } else {
        document.getElementById('plus-one-section').style.display = 'none';
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
