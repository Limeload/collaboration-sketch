import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCY_lHHHSAjhGq7no6ETe4002WQIa5Cx7s",
  authDomain: "chalktalk-a490b.firebaseapp.com",
  projectId: "chalktalk-a490b",
  storageBucket: "chalktalk-a490b.appspot.com",
  messagingSenderId: "91351348063",
  appId: "1:91351348063:web:5a1cffa576ef09f515fcea"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const app = createApp(App)
app.use(router)

app.mount('#app')
