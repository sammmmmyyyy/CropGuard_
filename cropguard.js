// Import Firebase Firestore functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

// Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyA2rO1Dzg99n1XP55oR1xAys8Q1i6WbbpI",
    authDomain: "cropguard-1d323.firebaseapp.com",
    projectId: "cropguard-1d323",
    storageBucket: "cropguard-1d323.appspot.com",
    messagingSenderId: "513110675804",
    appId: "1:513110675804:web:358bf6779b7fbdb912b199",
    measurementId: "G-TNHYSPJ1D9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", function () {
    let selectedLanguage = localStorage.getItem("selectedLanguage") || "en";
    console.log("Selected Language:", selectedLanguage);
    
    // Function to translate UI text dynamically (if required later)
    function applyTranslations() {
        // Example: document.getElementById("someElement").innerText = translations[selectedLanguage]["someText"];
    }
    
    applyTranslations();

    let map = L.map('map-container').setView([20.5937, 78.9629], 5); // Default: India

    // Add OpenStreetMap Tile Layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    async function fetchStorages() {
        try {
            const querySnapshot = await getDocs(collection(db, "storages"));
            
            if (querySnapshot.empty) {
                console.warn("No storage locations found in database.");
                return;
            }

            querySnapshot.forEach((doc) => {
                let storage = doc.data();

                // Check if 'location' field exists and contains GeoPoint
                if (!storage.location || !storage.location.latitude || !storage.location.longitude) {
                    console.warn(`Storage ${storage.name} is missing a valid GeoPoint location.`);
                    return;
                }

                let lat = storage.location.latitude;
                let lng = storage.location.longitude;

                console.log(`Storage Found: ${storage.name} at (${lat}, ${lng})`);

                // Add marker for each storage location
                L.marker([lat, lng])
                    .addTo(map)
                    .bindPopup(`
                        <h3>${storage.name}</h3>
                        <p><strong>Location:</strong> ${storage.address}</p>
                        <p><strong>Price:</strong> ₹${storage.price_per_kg}/kg</p>
                        <p><strong>Available Space:</strong> ${storage.available_space} kg</p>
                        <p><strong>Phone:</strong> ${storage.phone}</p>
                    `);
            });

        } catch (error) {
            console.error("Error fetching storage data:", error);
        }
    }

    fetchStorages();
});

// Function to Handle Search Button
function findStorage() {
    let crop = document.getElementById('crop').value;
    let quantity = document.getElementById('quantity').value;
    let days = document.getElementById('days').value;
    let location = document.getElementById('location').value;
    
    if (crop && quantity && days && location) {
        alert(`Searching for storage for ${quantity}kg of ${crop} for ${days} days near ${location}`);
        // Location-based filtering logic can be implemented here
    } else {
        alert("Please fill in all fields.");
    }
}

// Attach function to window for HTML button click
window.findStorage = findStorage;
