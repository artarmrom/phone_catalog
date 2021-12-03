import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBe83XFVJPQeN7KA4PC8cnPIIcz3CCJiWI",
    authDomain: "phonecatalog-23c32.firebaseapp.com",
    projectId: "phonecatalog-23c32",
    storageBucket: "phonecatalog-23c32.appspot.com",
    messagingSenderId: "924666249667",
    appId: "1:924666249667:web:1b41e8ddd8e61497817d76"
};

const firestore = firebase.initializeApp(firebaseConfig);
export default firestore;