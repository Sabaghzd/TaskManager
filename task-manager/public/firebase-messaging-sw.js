importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

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
firebase.initializeApp(firebaseConfig);

// Retrieve Firebase Messaging
const messaging = firebase.messaging();

// Check if messaging is supported
if (firebase.messaging.isSupported()) {
    messaging.onBackgroundMessage((payload) => {
        console.log('Received background message ', payload);

        const { notification } = payload;
        const { title, body, image } = notification;

        self.registration.showNotification(title, {
            body,
            icon: image || '/assets/icons/icon-72x72.png'
        });
    });
} else {
    console.log('Firebase Messaging is not supported on this browser.');
}
