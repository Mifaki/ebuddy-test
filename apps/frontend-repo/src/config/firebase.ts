import { getAuth } from "firebase/auth";
import { getFunctions } from "firebase/functions";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBNnfJU-rKxEqAe0ce2KRAcEk5Slnqm5n0",
  authDomain: "ebuddy-39919.firebaseapp.com",
  projectId: "ebuddy-39919",
  storageBucket: "ebuddy-39919.firebasestorage.app",
  messagingSenderId: "237552817988",
  appId: "1:237552817988:web:7b53237b6ad89345c9e911"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const functions = getFunctions(app);

export { app, auth, functions }