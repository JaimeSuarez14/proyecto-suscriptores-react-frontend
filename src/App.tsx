import {  useEffect, useState } from "react";
import type { Subscriber } from "./assets/interfaces/Subscriber";
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
  useEffect(( ) => {
    fetchSubscriber();
  }, [])
  
  const registrar = async (formData: FormData) => {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;

  const data: Subscriber = {
    name: name || "",
    email: email || "",
    active: true,
  };

  try {
    const response = await axios.post("http://localhost:8000/api/suscribers", data);

    if (response.status === 200) {
      await fetchSubscriber(); // refresca la lista
    }
  } catch (error) {
    console.log(error);
  }
};
  

  return (
    <>
      <div className="flex h-screen justify-center items-center flex-col bg-black text-white gap-3">
        <div className="p-4 border shadow-md h-[200] md:h-52 overflow-auto ">
          <h1 className="text-2xl font-bold text-blue-600 py-5">
            Lista de suscriptores
          </h1>
          <ul className="grid md:grid-cols-2 lg:grid-cols-4 gap-1">
            {subscribers.length > 0 ? (
              subscribers.map((s) => (
                <li
                  key={s.email}
                  className="shadow-xs shadow-blue-400 p-5 rounded-lg"
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
        <div className="p-4 border shadow-md bg-gray-900">
          <h1>Formulario para crear Nuevo suscriptores</h1>
          <form action={registrar} className="flex flex-col gap-2">
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
