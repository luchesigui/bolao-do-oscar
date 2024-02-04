import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

import { Categories } from "./categories";
import { Votes } from "./votes";

const firebaseConfig = {
  apiKey: "AIzaSyBZ7H8TR8uqdgj5PCEbHobiXwZDOlGp2KI",
  authDomain: "bolao-do-oscar-651fd.firebaseapp.com",
  projectId: "bolao-do-oscar-651fd",
  storageBucket: "bolao-do-oscar-651fd.appspot.com",
  messagingSenderId: "730531089530",
  appId: "1:730531089530:web:449f7ced2bf206a21d7fc3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);

export default {
  categories: new Categories(db),
  votes: new Votes(db),
};
