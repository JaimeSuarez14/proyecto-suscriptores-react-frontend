import { useFormStatus } from "react-dom";

export function SubmitButton() {
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