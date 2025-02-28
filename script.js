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

// Form Submission
document.getElementById("farmerForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let name = document.getElementById("name").value;
    let location = document.getElementById("location").value;
    let crop = document.getElementById("crop").value;

    // Add a new document with an auto-generated ID
    db.collection("farmers").add({
        name: name,
        location: location,
        crop: crop
    }).then((docRef) => {
        alert("Data Saved! Farmer ID: " + docRef.id);
        document.getElementById("farmerForm").reset();
        loadFarmers(); // Reload data
    }).catch((error) => {
        console.error("Error: ", error);
    });
});

// Load Farmers Data from Firestore
function loadFarmers() {
    document.getElementById("dataTable").innerHTML = "";
    db.collection("farmers").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            let data = doc.data();
            let farmerId = doc.id; // Get unique ID

            document.getElementById("dataTable").innerHTML += `
                <tr>
                    <td>${farmerId}</td>
                    <td>${data.name}</td>
                    <td>${data.location}</td>
                    <td>${data.crop}</td>
                </tr>
            `;
        });
    });
}

// Load data on page load
window.onload = loadFarmers;
