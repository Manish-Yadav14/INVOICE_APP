import { initializeApp } from "firebase/app";
import { getReactNativePersistence,initializeAuth } from "firebase/auth"; // For Authentication
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwGDVsqHh3uar2vG1YhVdg-PfCkcM4HiM",
  authDomain: "invoice-app-968fa.firebaseapp.com",
  projectId: "invoice-app-968fa",
  storageBucket: "invoice-app-968fa.appspot.com",
  messagingSenderId: "716897760040",
  appId: "1:716897760040:web:1fbf8cf58eb20125aa561d"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize auth service
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Initialize Firestore
const db = getFirestore(app);

export { auth , db };

