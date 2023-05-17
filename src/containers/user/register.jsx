import { useForm, Controller } from "react-hook-form";
import Button from "../../components/button";
import { RegisterUser } from "../../../API/connexion";
import * as yup from "yup";
import DatePicker from "../../components/datepicker/datepicker";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { loginAction } from "../../store/actions/user.action";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const dispatch = useDispatch()
  const navigation = useNavigate();
  const { mutate, error, context, data } = RegisterUser();

  if (data) {
    dispatch(loginAction(data.result))
    setTimeout(() => {
      navigation('/recipes')
    }, 1500);
  }

  const schema = yup.object().shape({
    name: yup
      .string()
      .min(1, "Name required !")
      .max(25, "Too much character !")
      .required(),
    surname: yup
      .string()
      .min(1, "Surname required !")
      .max(50, "Too much character !")
      .required(),
    email: yup.string().email("Must be a mail !").required("Mail required !"),
    birthdate: yup.date().required("Birthdate required !"),
    password: yup
      .string()
      .min(8, "Password doesn't not match the requirement !")
      .max(100)
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        "Password doesn't not match the requirement !"
      ),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitRegister = (data) => {
    const user = data
    console.log("user",user);
    mutate(user)
    
 
  };

  return (
    <div className=" w-96 m-auto mt-56 ">
      <form
        className="text-center mt-96 m-auto w-80 border-sky-400 border-2 flex flex-col justify-center content-center"
        onSubmit={handleSubmit(submitRegister)}
      >
        <div className="mt-2 flex flex-col justify-center content-center">
          <label htmlFor="name">Name : </label>
          <input
            className="w-56 m-auto"
            {...register("name")}
            id="name"
            type="text"
          />
          {errors.name && (
            <span className="text-red-500 font">{errors.name.message}</span>
          )}
        </div>

        <div className="mt-2 flex flex-col justify-center content-center">
          <label htmlFor="surname">Surname : </label>
          <input
            className="w-56 m-auto"
            {...register("surname")}
            id="surname"
            type="text"
          />
          {errors.surname && (
            <span className="text-red-500 font">{errors.surname.message}</span>
          )}
        </div>

        <div className="mt-2 flex flex-col justify-center content-center">
          <label htmlFor="surname">Mail : </label>
          <input
            className="w-56 m-auto"
            {...register("email")}
            id="email"
            type="email"
          />
          {errors.email && (
            <span className="text-red-500 font">{errors.email.message}</span>
          )}
        </div>

        {/* <div className="mt-2 flex flex-col justify-center content-center"> */}
        <label>Birthdate : </label>
        <div className="relative w-56 m-auto">
          <Controller
            control={control}
            name="birthdate"
            render={({ field }) => (
              <DatePicker
                btnLeft={
                  <ion-icon name="chevron-back-circle-outline"></ion-icon>
                }
                btnRight={
                  <ion-icon name="chevron-forward-circle-outline"></ion-icon>
                }
                lang={"en"}
                title={"Your birthdate "}
                onChange={(e) => field.onChange(e)}
                value={field.value}
              />
            )}
          />
          {errors.birthdate && (
            <span className="text-red-500 font">
              {errors.birthdate.message}
            </span>
          )}
        </div>

        <div className="mt-2 flex flex-col justify-center content-center">
          <label htmlFor="password">Password : </label>
          <input
            className="w-56 m-auto"
            {...register("password")}
            id="password"
            type="password"
          />
          {errors.password && (
            <span className="text-red-500 font">{errors.password.message}</span>
          )}
        </div>

        <Button className={'w-56 m-auto mt-2'} type={"submit"} text={"REGISTER"} />
      </form>
    </div>
  );
}
