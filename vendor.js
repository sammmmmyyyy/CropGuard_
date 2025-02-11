import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyA2rO1Dzg99n1XP55oR1xAys8Q1i6WbbpI",
  authDomain: "cropguard-1d323.firebaseapp.com",
  projectId: "cropguard-1d323",
  storageBucket: "cropguard-1d323.firebasestorage.app",
  messagingSenderId: "513110675804",
  appId: "1:513110675804:web:358bf6779b7fbdb912b199",
  measurementId: "G-TNHYSPJ1D9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.getElementById("vendor-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    // Fetch form values
    const storageName = document.getElementById("storage-name").value;
    const availableSpace = document.getElementById("available-space").value;
    const price = document.getElementById("price").value;
    const contactNumber = document.getElementById("contact-number").value;
    const latitude = parseFloat(document.getElementById("latitude").value);
    const longitude = parseFloat(document.getElementById("longitude").value);

    // Validate Decimal Format for Latitude & Longitude
    if (isNaN(latitude) || isNaN(longitude)) {
        alert("Please enter valid decimal values for Latitude and Longitude.");
        return;
    }

    // Store in Firestore
    try {
        await addDoc(collection(db, "vendors"), {
            storageName,
            availableSpace: Number(availableSpace),
            price: Number(price),
            contactNumber,
            latitude,
            longitude
        });
        alert("Storage registered successfully!");
        document.getElementById("vendor-form").reset();
    } catch (error) {
        console.error("Error adding document: ", error);
        alert("Error saving vendor details. Please try again.");
    }
});
