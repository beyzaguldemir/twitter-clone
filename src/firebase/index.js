// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBReMtXHtesqgsZVdPM8IgJ3E6h6RwNG-c",
  authDomain: "twitter-clone-b5fcf.firebaseapp.com",
  projectId: "twitter-clone-b5fcf",
  storageBucket: "twitter-clone-b5fcf.appspot.com",
  messagingSenderId: "529804220446",
  appId: "1:529804220446:web:9edb0a91501bb0634bb60f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// kimlik doğrulamanın referansını al
export const auth=getAuth(app)

// google provider kurulumu
export const provider=new GoogleAuthProvider()

//veritabanı referansını alma
export const db=getFirestore(app)

// storage 'ın referansını alma
export const storage=getStorage(app)