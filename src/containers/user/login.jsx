import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {} from "react-hook-form";
import { loginUser } from "../../../API/connexion";
import * as yup from "yup";
import Title from "../../components/title/title";
import ErrorInputDispay from "../../components/responses/error-input-display";
import ErrorDisplay from "../../components/responses/error-display";
import Loader from "../../components/loader/loader";




export default function Login() {
  
  const schema = yup.object().shape({
    email: yup.string().email("Must be a mail !").required("Mail required !"),
    password: yup
      .string()
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        "Password doesn't not match the requirement !"
      )
      .min(8)
      .max(100),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    criteriaMode: "all",
    resolver: yupResolver(schema),
  });

  const { mutate, data, isLoading, error } = loginUser();

  const onLogin = async (userLog) => {
    mutate(userLog);
    reset();
  };
  if (isLoading) {
    return <Loader className={"w-96 m-auto text-center"} />;
  }

  return (
    <>
      <Title text={"LOGIN"} className={"underline md:mt-36 lg:mt-20"} />
      <form
        onSubmit={handleSubmit(onLogin)}
        className="text-center m-auto mt-5 w-80 border-green-300 border-4 p-2 flex flex-col justify-center content-center"
      >
        <div className="mt-2 flex flex-col justify-center content-center">
          <label htmlFor="mail" className=" text-white font text-2xl">
            {" "}
            Mail :{" "}
          </label>
          <input className="w-3/4 m-auto" {...register("email")}></input>
          {errors.email && <ErrorInputDispay errors={errors} name={"email"} />}
        </div>

        <div className="mt-2 flex flex-col justify-center content-center ">
          <label htmlFor="password" className="text-white font text-2xl">
            {" "}
            Password :{" "}
          </label>
          <input
            className="w-3/4 m-auto"
            type="password"
            {...register("password")}
          ></input>
          {errors.password && (
            <ErrorInputDispay errors={errors} name={"password"} />
          )}
        </div>
        <button
          type="submit"
          className=" m-auto w-20 mt-2 bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-1 px-2 border border-green-500 hover:border-transparent rounded"
        >
          Submit
        </button>
        {error && (
          <ErrorDisplay
            text={
              error === 404
                ? "Password or mail incorrect"
                : "An error has occurred"
            }
          />
        )}
      </form>
    </>
  );
}
