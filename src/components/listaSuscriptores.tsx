import type { Subscriber } from "../interfaces/Subscriber";
import { CardSuscriptores } from "./cardSuscriptores";

type props = {
  subscribers: Subscriber[];
};

const ListaSuscriptores = ({ subscribers }: props) => {
  return (
    <div className="border w-full shadow-md h-96 lg:h-96 overflow-auto relative">
      <h1 className="text-2xl font-bold text-blue-600 p-4 sticky  bg-black top-0 right-0 left-0">
        Lista de suscriptores
      </h1>
      <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-1 p-4">
        {subscribers.length > 0 ? (
          subscribers.map((s) => (
            <CardSuscriptores key={s.email} subscribers={s} />
          ))
        ) : (
          <p>No hay suscriptores registrados</p>
        )}
      </ul>
    </div>
  );
};
export default ListaSuscriptores;
