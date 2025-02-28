// Replace with your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCQhN1TJRcRJ2ef34uCgRtPZON7E4lJj64",
  authDomain: "farmer-data-collection-48d45.firebaseapp.com",
  projectId: "farmer-data-collection-48d45",
  storageBucket: "farmer-data-collection-48d45.firebasestorage.app",
  messagingSenderId: "755785555291",
  appId: "1:755785555291:web:714b31f381697e43238e7e",
  measurementId: "G-T45LN4R8VM"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Handle form submission
document.getElementById("farmerForm").addEventListener("submit", (event) => {
    event.preventDefault();

    // Get input values
    let name = document.getElementById("name").value;
    let location = document.getElementById("location").value;
    let crop = document.getElementById("crop").value;

    // Add to Firestore
    db.collection("farmers").add({
        name: name,
        location: location,
        crop: crop,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        alert("Data submitted successfully!");
        document.getElementById("farmerForm").reset(); // Clear form
    }).catch((error) => {
        console.error("Error adding document: ", error);
    });
});

// Fetch and display farmers data
function loadFarmers() {
    document.getElementById("dataTable").innerHTML = ""; // Clear table before loading

    db.collection("farmers").orderBy("timestamp", "desc").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            let data = doc.data();
            let farmerId = doc.id; // Unique Firestore ID

            document.getElementById("dataTable").innerHTML += `
                <tr>
                    <td>${farmerId}</td>
                    <td>${data.name}</td>
                    <td>${data.location}</td>
                    <td>${data.crop}</td>
                </tr>
            `;
        });
    }).catch((error) => {
        console.error("Error fetching documents: ", error);
    });
}

// Call function to load data when page loads
window.onload = loadFarmers;

