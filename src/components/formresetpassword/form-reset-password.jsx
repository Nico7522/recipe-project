import { useForm } from "react-hook-form";
import { resetPassword } from "../../../API/connexion";
import { useFetchUser } from "../../hooks/user-hooks";
import Button from "../button";

export default function FormResetPassword() {
  const { userId, userStatus, config } = useFetchUser();
  const reset = resetPassword();
  const { register, handleSubmit, reset: resetValue } = useForm();
  const handleResetPsw = ({ password }) => {
    reset.mutate({ userId, password, config });

    resetValue();
  };
  return (
    <div className="w-96 m-auto mt-5 ">
      <form
        onSubmit={handleSubmit(handleResetPsw)}
        className="flex flex-col justify-center items-center	"
      >
        <label htmlFor="password" className=" text-white">New password : </label>
        <input {...register("password")} type="password" />
        <Button style={"mr-8"} text={"RESET"} />
      </form>

      {reset.error && (
        <div className="text-center text-red-700 font text-2xl">
          {reset.error.response.data.message}
        </div>
      )}
      {reset.isSuccess && (
        <p className="text-center text-green-700 font text-2xl">
          Password changed !{" "}
        </p>
      )}
    </div>
  );
}
