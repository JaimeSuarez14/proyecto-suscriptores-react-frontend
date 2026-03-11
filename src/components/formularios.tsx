import { SubmitButton } from "./SubmitButton";

interface props {
  registrar: (formData: FormData) => Promise<void>;
}


const Formulario = ({ registrar }:props) => {
  return (
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
              className="border border-white w-full p-2 rounded-lg"
            />
          </div>

          <div className="flex-1">
            <label htmlFor="">Email: </label>
            <input
              type="email"
              name="email"
              id=""
              className="border border-white w-full p-2 rounded-lg"
            />
          </div>
          <SubmitButton />
        </form>
      </div>
    </div>
  );
};
export default Formulario;
