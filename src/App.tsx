import { useEffect, useState } from "react";
import type { Subscriber } from "./interfaces/Subscriber";
import axios from "axios";
import Formulario from "./components/formularios";
import ListaSuscriptores from "./components/listaSuscriptores";

function App() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);

  useEffect(() => {
    const fetchSubscriber = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/suscribers",
        );
        console.log(response);
        const data = response.data as Subscriber[];
        setSubscribers(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSubscriber();
  }, []);

  const registrar = async (formData: FormData) => {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    if (name.trim().length < 1 || email.trim().length < 1) {
      alert("Ingresa los datos a los campos");
      return;
    }
    const newSubscriber: Subscriber = {
      name: name || "",
      email: email || "",
      active: true,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/suscribers",
        newSubscriber,
      );

      // Verificamos si la respuesta fue exitosa (200 o 201)
      if (response.status === 200 || response.status === 201) {
        // OPCIÓN A: Actualizar el estado manualmente (Más rápido)
        // Usamos el objeto que nos devuelva el servidor (por si generó un ID)
        const creado = response.data as Subscriber;
        setSubscribers((prev) => [...prev, creado]);

        // OPCIÓN B: Si prefieres volver a llamar a la API, asegúrate de que entre aquí
        // fetchSubscriber();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex h-screen justify-center items-center  bg-blue-950 text-white gap-3">
        <div className="flex justify-center items-center flex-col w-screen md:max-w-2xl gap-3"> 
          <ListaSuscriptores subscribers={subscribers} />
          <Formulario  registrar={registrar} />
        </div>
      </div>
    </>
  );
}

export default App;
