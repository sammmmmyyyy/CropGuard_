import { database } from './firebaseConfig';
import { ref, set, get } from "firebase/database";

async function testFirebaseConnection() {
    const testRef = ref(database, 'testConnection');

    // Write data
    await set(testRef, { connected: true });

    // Read data
    const snapshot = await get(testRef);
    if (snapshot.exists()) {
        console.log("Database connection successful:", snapshot.val());
    } else {
        console.log("No data available");
    }
}

testFirebaseConnection().catch(console.error);