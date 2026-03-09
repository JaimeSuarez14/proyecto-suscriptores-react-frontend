import { useEffect, useState } from "react";
import type { Subscriber } from "./interfaces/Subscriber";
import axios from "axios";
import { useFormStatus } from "react-dom";

function App() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);

  const fetchSubscriber = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/suscribers");
      console.log(response);
      const data = (await response.data) as Subscriber[];
      setSubscribers(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
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
          <div className="border w-full shadow-md h-96 lg:h-96 overflow-auto relative">
            <h1 className="text-2xl font-bold text-blue-600 p-4 sticky  bg-black top-0 right-0 left-0">
              Lista de suscriptores
            </h1>
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-1 p-4">
              {subscribers.length > 0 ? (
                subscribers.map((s) => (
                  <li
                    key={s.email}
                    className="shadow-xs bg-gray-900 shadow-blue-400 p-5 rounded-lg"
                  >
                    <p> Nombre: {s.name}</p>
                    <p> Email: {s.email}</p>
                    <p> Estado: {s.active ? "Activo" : "Inactivo"}</p>
                  </li>
                ))
              ) : (
                <p>No hay suscriptores registrados</p>
              )}
            </ul>
          </div>

          <div className="p-4 border shadow-md bg-gray-900 w-full flex flex-col justify-center items-center gap-2">
            <div className=" bg-black p-3">
              <h1 className="py-2">Formulario para crear Nuevo suscriptores</h1>
              <form action={registrar} className="flex flex-col gap-2 w-fit">
                <div className="flex-1">
                  <label htmlFor="">Name: </label>
                  <input
                    type="text"
                    name="name"
                    id=""
                    className="border border-white w-full"
                  />
                </div>

                <div className="flex-1">
                  <label htmlFor="">Email: </label>
                  <input
                    type="email"
                    name="email"
                    id=""
                    className="border border-white w-full"
                  />
                </div>
                <SubmitButton />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-lg bg-red-600 hover:bg-red-700"
    >
      {pending ? "Registrando..." : "Registrar"}
    </button>
  );
}

export default App;
