//importamos los jooks de Recat y las funciones necesarias de Firebase Firestore
import { useEffect, useState } from "react";
import { db } from "./firebaseConfig" //importamos la configuracion de Firebase
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc
} from "firebase/firestore";

//importamos Chart.js para la generacion de reportes graficos
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartsJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
} from "chart.js";

//Registramos los componenetes necesarios para que funcione CHart.js
ChartsJS.register(CategoryScale, LinearScale, BarElement, Title);

function App() {
  //Definimos los estado para el formulario y los datos de la base de datos
  const [name , setName] = useState("");
  const [age, setAge] = useState("");
  const [users,setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);

  //funcion par aobtener los usuarios de Firebase firestore
  const fetchUsers = async () => {
    const querySnapshot = await getDocs(collection(db,"users"));
    setUsers(querySnapshot.docs.map((doc) => ({id: doc.id, ...doc.data() })));
  };

  //Funcion para agregar un nuevo usuario A FIREBASE FIREstore
  const addUser = async () => {
    if (name.trim() && age.trim() ) {
      await addDoc(collection(db,"users"),{name,age: Number(age) });
      setName("");
      setAge("");
      fetchUsers();
    }
  };

  //Funcion para actulizar un usuario existente
  const updateUser = async () => {
    if(editingId && name.trim() && age.trim() ) {
      await updateDoc(doc(db,"users",editingId), {name, age: Number(age) });
      setEditingId(null);
      setName("");
      setAge("");
      fetchUsers();
    }
  };

  //funcion para eliminar un usuario
  const deleteUser = async (id) => {
    await deleteDoc(doc(db, "users", id));
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);


  //cargar los usuarios de los datos para le grafico de barras
  const ChartData = {
    labels: users.map((user) => user.name),
    datasets: [
      {
        label: "Edad",
        data: users.map((user) => user.age),
        backgroundColor: "blue",
      },
    ],
  };


  return (
    <div style={{textAlign:"center", marginTop:"50px"}}>
      <h1>CRUD con Firebase y Reportes</h1>

      {/* Formulario de entrada de datos */}
      <input
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
      placeholder="Nombre" 
      />
      <input
      type="number"
      value={age}
      onChange={(e) => setAge(e.target.value)}
      placeholder="Edad" 
      />

      { editingId ? (
        <button onClick={updateUser}>Actulizar</button>
      ) : (
        <button onClick={addUser}>Agregar</button>
      )}

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.age} años
            <button onClick={() => { setName(user.name); setAge(user.age); setEditingId(user.id); }}>Editar </button>
            <button onClick={() => deleteUser(user.id)}>Eliminar</button>
          </li>
        ))}
      </ul>

      <h2>Reportes de Edades</h2>
      <Bar 
      data={ChartData}
      />

    </div>
  );


}

 export default App;