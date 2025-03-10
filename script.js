// Import Firebase Modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Firebase Config
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
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to Generate Unique Farmer ID
function generateFarmerID() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let id = '';
    for (let i = 0; i < 6; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
}

// Wait for Page to Load
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('farmerForm').addEventListener('submit', async function(event) {
        event.preventDefault(); // Prevents Page Refresh

        // Collect Form Data
        let farmerID = generateFarmerID();
        const farmerName = document.getElementById('farmerName').value;
        const farmerPhone = document.getElementById('farmerPhone').value;
        const farmerLocation = document.getElementById('farmerLocation').value;
        const farmerAge = document.getElementById('farmerAge').value;
        const farmerGender = document.getElementById('farmerGender').value;
        const farmSize = document.getElementById('farmSize').value;
        const farmingType = document.getElementById('farmingType').value;
        const mainCropsLivestock = document.getElementById('mainCropsLivestock').value;
        const farmingExperience = document.getElementById('farmingExperience').value;
        const equipmentNeeded = document.getElementById('equipmentNeeded').value;
        const irrigationSupport = document.getElementById('irrigationSupport').value;
        const storageFacility = document.getElementById('storageFacility').value;
        const bankAccount = document.getElementById('bankAccount').value;
        const momoAccount = document.getElementById('momoAccount').value;    
        const agriLoan = document.getElementById('agriLoan').value;
        const trainingInterest = document.getElementById('trainingInterest').value;
        const smartphoneAccess = document.getElementById('smartphoneAccess').value;
        const internetAccess = document.getElementById('internetAccess').value;

        try {
            // Save Data to Firestore
            await addDoc(collection(db, "farmers"), {
                farmerID: farmerID,
                name: farmerName,
                phone: farmerPhone,
                location: farmerLocation,
                age: farmerAge,
                gender: farmerGender,
                farmSize: farmSize,
                farmingType: farmingType,
                mainCropsLivestock: mainCropsLivestock,
                farmingExperience: farmingExperience,
                equipmentNeeded: equipmentNeeded,  // Fixed error here
                irrigationSupport: irrigationSupport,  // Fixed error here
                storageFacility: storageFacility,  // Fixed error here
                bankAccount: bankAccount,  // Fixed error here
                momoAccount: momoAccount,  // Fixed error here
                agriLoan: agriLoan,  // Fixed error here
                trainingInterest: trainingInterest,  // Fixed error here
                smartphoneAccess: smartphoneAccess,  // Fixed error here
                internetAccess: internetAccess  // Fixed error here
            });

            // Success Message
            document.getElementById('alertMessage').innerHTML = `
                ✅ Registration Successful! Your Farmer ID: <strong>${farmerID}</strong>
            `;
            document.getElementById('alertMessage').style.color = "green";

            // Reset Form
            document.getElementById('farmerForm').reset();
        } catch (error) {
            // Error Handling
            document.getElementById('alertMessage').innerHTML = `❌ Error: ${error.message}`;
            document.getElementById('alertMessage').style.color = "red";
        }
    });
});
