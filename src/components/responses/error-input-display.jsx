import { ErrorMessage } from "@hookform/error-message";

export default function ErrorInputDispay({ errors, name }) {
  return (
    <ErrorMessage
      errors={errors}
      name={name}
      render={({ messages }) =>
        messages &&
        Object.entries(messages).map(([type, message]) => (
          <p className="text-red-500 font text-3xl" key={type}>
            {message}
          </p>
        ))
      }
    />
  );
}
