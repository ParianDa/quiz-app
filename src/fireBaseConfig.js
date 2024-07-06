// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAq0RV2eLiRFkIwxHnj6_6_bVQTBjDS3WY",
    authDomain: "quiz-app-b9e5f.firebaseapp.com",
    projectId: "quiz-app-b9e5f",
    storageBucket: "quiz-app-b9e5f.appspot.com",
    messagingSenderId: "329902603067",
    appId: "1:329902603067:web:bc4026ea2a3d1c3d9f151e",
    measurementId: "G-G6PC9JJ16X"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
