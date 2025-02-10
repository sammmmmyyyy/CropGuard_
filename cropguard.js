// Import Firebase Firestore functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

// Firebase Config (REPLACE WITH YOUR ACTUAL CONFIG)
const firebaseConfig = {
    apiKey: "YOUR_FIREBASE_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
    measurementId: "YOUR_MEASUREMENT_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Initialize Leaflet Map
let map = L.map('map-container').setView([20.5937, 78.9629], 5);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Layer group to manage markers
let markersLayer = L.layerGroup().addTo(map);

// Function to get Latitude & Longitude using OpenStreetMap's Nominatim API
async function getCoordinates(locationName) {
    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locationName)}`);
        if (!response.ok) {
            throw new Error(`Nominatim API error: ${response.status}`);
        }
        const data = await response.json();
        if (data.length === 0) return null;
        return { latitude: parseFloat(data[0].lat), longitude: parseFloat(data[0].lon) };
    } catch (error) {
        console.error("Error getting coordinates:", error);
        alert("Error getting location coordinates. Please try again.");
        return null;
    }
}

// Function to calculate distance using the Haversine formula
function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// Function to find the nearest and next two cold storages
async function findStorage() {
    let crop = document.getElementById('crop').value;
    let quantity = parseFloat(document.getElementById('quantity').value) || 0;
    let days = parseInt(document.getElementById('days').value) || 0;
    let userLocation = document.getElementById('location').value;

    if (!crop || !quantity || !days || !userLocation) {
        alert("Please fill in all fields.");
        return;
    }

    let userCoords = await getCoordinates(userLocation);
    if (!userCoords) {
        return; // getCoordinates already alerted the user
    }

    let { latitude: userLat, longitude: userLon } = userCoords;

    const storagesRef = collection(db, "storages");
    const querySnapshot = await getDocs(storagesRef);

    let storageList = [];
    querySnapshot.forEach((doc) => {
        let storage = doc.data();
        if (storage.location && storage.location.latitude && storage.location.longitude) {
            storage.distance = getDistance(userLat, userLon, storage.location.latitude, storage.location.longitude);
            storageList.push(storage);
        }
    });

    if (storageList.length === 0) {
        alert("No storages found.");
        return;
    }

    // Sort storages by distance (ascending order)
    storageList.sort((a, b) => a.distance - b.distance);

    // Display nearest cold storage
    let nearestStorage = storageList[0];
    displayStorageDetails(nearestStorage, quantity, days, "nearest");

    // Display further two storages
    let furtherStorages = storageList.slice(1, 3);
    furtherStorages.forEach((storage, index) => {
        displayStorageDetails(storage, quantity, days, `further-${index + 1}`);
    });

    // Clear old markers
    markersLayer.clearLayers();

    // Add markers for all three storages
    storageList.slice(0, 3).forEach((storage, index) => {
        if (storage.location && storage.location.latitude && storage.location.longitude) {
            let marker = L.marker([storage.location.latitude, storage.location.longitude])
                .addTo(markersLayer)
                .bindPopup(`<h3>${storage.name || "N/A"} (${index === 0 ? "Nearest" : `Further ${index}`})</h3><p>₹${storage.price}/kg</p>`);
            if (index === 0) marker.openPopup();
        }
    });

    // Set map view to include the nearest storage
    if (nearestStorage && nearestStorage.location) {
        map.setView([nearestStorage.location.latitude, nearestStorage.location.longitude], 10);
    }
}

// Helper function to display storage details
function displayStorageDetails(storage, quantity, days, prefix) {
    let pricePerKg = parseFloat(storage.price) || 0; // Parse price as float
    let totalPrice = quantity * pricePerKg * days; // Assuming price is per kg/day

    document.getElementById(`${prefix}-storage-name`).innerText = storage.name || "N/A";
    document.getElementById(`${prefix}-storage-price`).innerText = `₹${pricePerKg}/kg`;
    document.getElementById(`${prefix}-total-cost`).innerText = `₹${totalPrice.toFixed(2)}`;
    document.getElementById(`${prefix}-storage-contact`).innerText = storage["contact number"] || "N/A";
}

// Attach function to window
window.findStorage = findStorage;
