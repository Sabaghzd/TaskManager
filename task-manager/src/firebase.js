// src/firebase.js
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAbC7OepabGghhQmIFHxUt8U1F2DMrocaA",
    authDomain: "taskmanager-c1378.firebaseapp.com",
    projectId: "taskmanager-c1378",
    storageBucket: "taskmanager-c1378.appspot.com",
    messagingSenderId: "424336913373",
    appId: "1:424336913373:web:1c8c7f40f10e5a6ed1bc34",
    measurementId: "G-NGLX8ZGF8R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const messaging = getMessaging(app);

// Use the VAPID public key
const vapidKey = 'BBeBZT7KyTUiM_4rNKSGyq4xavMsuH7dCfY8q94rVPIU2X5lmU5bfhnEV42lwtlAGkAs3cgWq2Z4D6p7Skl3Syw';

// Request permission and get the FCM token
const requestPermission = async () => {
    try {
        // Ensure that vapidKey is a valid format
        const token = await getToken(messaging, { vapidKey });
        if (token) {
            console.log('FCM Token:', token);
        } else {
            console.log('No registration token available.');
        }
        return token; // Return the token to be used in App.js
    } catch (error) {
        console.error('An error occurred while retrieving token.', error);
        return null; // Return null in case of an error
    }
};

// Export messaging and functions for use in your app
export { messaging, onMessage, requestPermission, vapidKey };
