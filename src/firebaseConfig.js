import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDKihLp9fwroQ89mK01f2W7gg7A3I5W8Fc",
  authDomain: "miapp-integral-26d75.firebaseapp.com",
  projectId: "miapp-integral-26d75",
  storageBucket: "miapp-integral-26d75.firebasestorage.app",
  messagingSenderId: "277941010956",
  appId: "1:277941010956:web:685126cefcb700a2112429",
  measurementId: "G-LRF9F5GL8S"
};

//Inicializa la aplicacion Firebase con la configuracion proporcionada
const app = initializeApp(firebaseConfig);

//Obtiene una instancia de la base de datos FIrestore
const db = getFirestore(app);

//Exportamos la instancia de Firestore para poder usarla en otros archivos de React
export{db};