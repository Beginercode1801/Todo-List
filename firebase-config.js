// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDZyz5EgiVYrz6slGR8V0QkKdAZNGFGUUc",
    authDomain: "notewebsite-11c39.firebaseapp.com",
    projectId: "notewebsite-11c39",
    storageBucket: "notewebsite-11c39.firebasestorage.app",
    messagingSenderId: "403787238202",
    appId: "1:403787238202:web:3e67bb93b71cae981e1e03",
    measurementId: "G-ESL7YP57QC"
  };
  
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const db = firebase.firestore();