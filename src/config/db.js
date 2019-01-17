import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

const settings = {timestampsInSnapshots: true}; //7agat firestore 

const config = {
    apiKey: "AIzaSyC4YCQZQjhWSgJyPSlgYMwbizBNPTJUiw0",
    authDomain: "customer-38fae.firebaseapp.com",
    databaseURL: "https://customer-38fae.firebaseio.com",
    projectId: "customer-38fae",
    storageBucket: "customer-38fae.appspot.com",
    messagingSenderId: "712736876241"
};
firebase.initializeApp(config);

firebase.firestore().settings(settings); // 

export default firebase;