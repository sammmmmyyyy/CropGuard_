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

// Initialize Leaflet Map
let map = L.map('map-container').setView([20.5937, 78.9629], 5);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Function to get Latitude & Longitude using OpenStreetMap's Nominatim API
async function getCoordinates(locationName) {
    const apiUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locationName)}`;

    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 seconds timeout

        const response = await fetch(apiUrl, { 
            method: "GET",
            headers: { "User-Agent": "CropGuard/1.0" },
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        const data = await response.json();

        if (data.length > 0) {
            return { latitude: parseFloat(data[0].lat), longitude: parseFloat(data[0].lon) };
        } else {
            throw new Error("No results found for this location.");
        }
    } catch (error) {
        if (error.name === 'AbortError') {
            alert("Request timed out. Please try again.");
        } else {
            alert("Could not fetch coordinates. Please try again.");
        }
        console.error("Error fetching coordinates:", error);
        return null;
    }
}

// Function to calculate distance using Haversine formula
function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// Function to find nearest storage
async function findStorage() {
    let userLocation = document.getElementById('location').value.trim();
    if (!userLocation) {
        alert("Please enter your location.");
        return;
    }

    let userCoords = await getCoordinates(userLocation);
    if (!userCoords) {
        alert("Could not find coordinates. Try a different location.");
        return;
    }

    let { latitude: userLat, longitude: userLon } = userCoords;
    console.log(`User Coordinates: ${userLat}, ${userLon}`);

    try {
        // Fetch storage data from Firestore
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

        // Sort by distance (nearest first)
        storageList.sort((a, b) => a.distance - b.distance);
        let nearestStorage = storageList[0];

        // Display nearest storage details
        document.getElementById("storage-name").innerText = nearestStorage.name || "N/A";
        document.getElementById("storage-price").innerText = nearestStorage.price ? `₹${nearestStorage.price}/kg` : "N/A";
        document.getElementById("storage-contact").innerText = nearestStorage.contact || "N/A";

        // Clear old markers
        map.eachLayer((layer) => {
            if (layer instanceof L.Marker) {
                map.removeLayer(layer);
            }
        });

        // Add user location marker
        L.marker([userLat, userLon], { 
            icon: L.icon({ 
                iconUrl: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png', 
                iconSize: [32, 32] 
            }) 
        }).addTo(map).bindPopup(`<b>Your Location</b><br>${userLocation}`).openPopup();

        // Add storage location markers
        storageList.forEach((storage) => {
            L.marker([storage.location.latitude, storage.location.longitude])
                .addTo(map)
                .bindPopup(`<h3>${storage.name}</h3><p>₹${storage.price}/kg</p>`);
        });

        // Center map to nearest storage
        map.setView([nearestStorage.location.latitude, nearestStorage.location.longitude], 10);

    } catch (error) {
        console.error("Error fetching storages:", error);
        alert("Failed to fetch storage data. Try again later.");
    }
}

// Attach function to global scope
window.findStorage = findStorage;
