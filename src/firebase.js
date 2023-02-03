// import firebase from "firebase";
// import { initializeApp } from 'firebase/app';
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyDbMJLc5auIToCZDKnPiREBwfXrzbnfE_8",
    authDomain: "clone-e7677.firebaseapp.com",
    projectId: "clone-e7677",
    storageBucket: "clone-e7677.appspot.com",
    messagingSenderId: "993719753457",
    appId: "1:993719753457:web:e91644010793ed3b456750",
    measurementId: "G-8J6FR5C69G"
  };


  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  
  export { db, auth };

// const firebaseApp = initializeApp(firebaseConfig);

// const db = getFirestore(firebaseApp);
// const auth = getAuth();

// export { db , auth };