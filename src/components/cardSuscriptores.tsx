import type { Subscriber } from "../interfaces/Subscriber";

type Props = {
  subscribers: Subscriber;
};
export const CardSuscriptores = ({ subscribers: s }: Props) => {
  return (
    <li
      key={s.email}
      className="shadow-xs bg-gray-900 shadow-blue-400 p-5 rounded-lg"
    >
      <p> Nombre: {s.name}</p>
      <p> Email: {s.email}</p>
      <p> Estado: {s.active ? "Activo" : "Inactivo"}</p>
    </li>
  );
};
