import { useForm, Controller } from "react-hook-form";
import Button from "../../components/button";
import { RegisterUser } from "../../../API/connexion";
import * as yup from "yup";
import DatePicker from "../../components/datepicker/datepicker";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { loginAction } from "../../store/actions/user.action";
import { useNavigate } from "react-router-dom";
import Title from "../../components/title/title";
import ErrorInputDispay from "../../components/responses/error-input-display";

export default function Register() {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const { mutate, error, context, data } = RegisterUser();

  if (data) {
    dispatch(loginAction(data.result));
    setTimeout(() => {
      navigation("/recipes/all");
    }, 1500);
  }

  const schema = yup.object().shape({
    name: yup.string().max(25, "Too much character !").required(),
    surname: yup.string().max(50, "Too much character !").required(),
    email: yup.string().email("Invalid mail !").required("Required field !"),
    birthdate: yup.date()
    .test('birthdate', 'You must be adult !', (value) => {
      const date = new Date().getFullYear()
      if (value.getFullYear() > (date - 18)){
        return false
      }
      return true
    })
    .required("Required field !"),
    password: yup
      .string()
      .test("password", "Required field !", (value) => {
        return value !== undefined && value.trim() !== "";
      })
      .test("password", "Password doesn't match the requirement !", (value) => {
        if (value === undefined || value.trim() === "") {
          return true; 
        }
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(
          value
        );
      })
     
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    criteriaMode: "all",
    resolver: yupResolver(schema),
  });

  const submitRegister = (data) => {
    const user = data;
    mutate(user);
  };

  return (
    <>
      <Title
        text={"CREATE A ACCOUNT"}
        className={"underline md:mt-36 lg:mt-20"}
      />

      <form
        className="text-center m-auto mt-5 w-80 p-2 flex flex-col justify-center content-center border-4 border-green-700"
        onSubmit={handleSubmit(submitRegister)}
      >
        <div className="mt-2 flex flex-col justify-center content-center">
          <label className="text-white" htmlFor="name">
            Name :{" "}
          </label>
          <input
            className="w-64 m-auto rounded-2xl"
            {...register("name")}
            id="name"
            type="text"
          />
          {errors.name && <ErrorInputDispay errors={errors} name={"name"} />}
        </div>

        <div className="mt-2 flex flex-col justify-center content-center">
          <label className="text-white" htmlFor="surname">
            Surname :{" "}
          </label>
          <input
            className="w-64 m-auto rounded-2xl"
            {...register("surname")}
            id="surname"
            type="text"
          />
          {errors.surname && (
            <ErrorInputDispay errors={errors} name={"surname"} />
          )}
        </div>

        <div className="mt-2 flex flex-col justify-center content-center">
          <label className="text-white" htmlFor="email">
            Mail :{" "}
          </label>
          <input
            className="w-64 m-auto rounded-2xl"
            {...register("email")}
            id="email"
            type="email"
          />
          {errors.email && <ErrorInputDispay errors={errors} name={"email"} />}
        </div>

        <div className="relative w-64 m-auto">
          <label className="text-white" htmlFor="birthdate">
            Birthdate :{" "}
          </label>
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
            <ErrorInputDispay errors={errors} name={"birthdate"} />
          )}
        </div>

        <div className="mt-2 flex flex-col justify-center content-center">
          <label className="text-white" htmlFor="password">
            Password :{" "}
          </label>
          <input
            className="w-64 m-auto rounded-2xl"
            {...register("password")}
            id="password"
            type="password"
          />
          {errors.password && (
            <ErrorInputDispay errors={errors} name={"password"} />
          )}
        </div>

        <Button
          className={"w-36 m-auto mt-2"}
          type={"submit"}
          text={"REGISTER"}
        />
      </form>
    </>
  );
}
