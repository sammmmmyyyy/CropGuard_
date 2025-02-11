// Import Firebase Firestore functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

// Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyA2rO1Dzg99n1XP55oR1Ays8Q1i6WbbpI",
    authDomain: "cropguard-1d323.firebaseapp.com",
    projectId: "cropguard-1d323",
    storageBucket: "cropguard-1d323.appspot.com",
    messagingSenderId: "513110675804",
    appId: "1:513110675804:web:358bf6779b7fbdb912b199",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Initialize Leaflet Map
let map = L.map('map-container').setView([20.5937, 78.9629], 5);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);
let markersLayer = L.layerGroup().addTo(map);

// Function to get coordinates from a city name using OpenStreetMap API
async function getCoordinates(city) {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${city}`);
    const data = await response.json();
    if (data.length > 0) {
        return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
    } else {
        return null;
    }
}

// Function to calculate distance between two coordinates
function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

// Function to fetch vendor storage locations and find the nearest one
async function findStorage() {
    let userLocation = document.getElementById('location').value.trim();
    let quantity = parseFloat(document.getElementById('quantity').value) || 0;
    let days = parseInt(document.getElementById('days').value) || 0;

    if (!userLocation || !quantity || !days) {
        alert("Please fill in all fields.");
        return;
    }

    try {
        const userCoords = await getCoordinates(userLocation);
        if (!userCoords) {
            alert("Invalid location. Please enter a valid city.");
            return;
        }

        const userLat = userCoords.lat;
        const userLng = userCoords.lon;

        const vendorsRef = collection(db, "vendors");
        const querySnapshot = await getDocs(vendorsRef);
        
        let vendorList = [];
        let nearestVendor = null;
        let minDistance = Infinity;

        querySnapshot.forEach((doc) => {
            let vendor = doc.data();
            if (vendor.latitude && vendor.longitude) {
                vendorList.push(vendor);

                const distance = getDistance(userLat, userLng, vendor.latitude, vendor.longitude);
                if (distance < minDistance) {
                    minDistance = distance;
                    nearestVendor = vendor;
                }
            }
        });

        if (vendorList.length === 0) {
            alert("No vendor storages found.");
            return;
        }

        // Display nearest vendor details
        if (nearestVendor) {
            document.getElementById("storage-name").innerText = nearestVendor.storageName || "N/A";
            document.getElementById("storage-price").innerText = `₹${nearestVendor.price}/kg` || "N/A";
            document.getElementById("total-cost").innerText = `₹${(quantity * nearestVendor.price * days).toFixed(2)}`;
            document.getElementById("storage-contact").innerText = nearestVendor.contactNumber || "N/A";

            map.setView([nearestVendor.latitude, nearestVendor.longitude], 10);
        } else {
            document.getElementById("storage-name").innerText = "N/A";
            document.getElementById("storage-price").innerText = "₹0";
            document.getElementById("total-cost").innerText = "₹0";
            document.getElementById("storage-contact").innerText = "N/A";
        }

        // Clear old markers
        markersLayer.clearLayers();

        // Add markers for all vendor storages
        vendorList.forEach((vendor) => {
            L.marker([vendor.latitude, vendor.longitude])
                .addTo(markersLayer)
                .bindPopup(`<h3>${vendor.storageName}</h3>
                            <p>Price: ₹${vendor.price}/kg</p>
                            <p>Available Space: ${vendor.availableSpace} kg</p>
                            <p>Contact: ${vendor.contactNumber}</p>`);
        });

    } catch (error) {
        console.error("Error fetching vendors:", error);
        alert("Failed to fetch vendor data. Try again later.");
    }
}

// Attach function to window
window.findStorage = findStorage;
