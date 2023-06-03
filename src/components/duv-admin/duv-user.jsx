import { useForm } from "react-hook-form";
import { deleteUser, updateStatus, updateStatutTest, useFetchUser } from "../../../API/connexion";
import Button from "../Button";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";

export default function DuvUser({ id }) {

  const { register, handleSubmit } = useForm();
  const updateUser = updateStatus()
  const test = updateStatutTest()
  const banUser = deleteUser();
  const handleStatus = ({ status }) => {
    const statusChange = status;

    test.mutate({id, statusChange})
   
  };
  return (
    <div className="flex flex-col sm:flex-col md:flex-col lg:flex-col xl:flex-col">
      <form
        className="flex flex-col  sm:flex-col  md:flex-col lg:flex-col xl:flex-col"
        onSubmit={handleSubmit(handleStatus)}
      >
        <select className="text-center" {...register("status")}>
          <option value="Admin">Admin</option>
          <option value="User">User</option>
          <option value="Certified user">Certified user</option>
        </select>
        <Button className={"lg:w-3/4 m-auto"} type={"submit"} text={"SET"} />
      </form>
      <Button
        className={"lg:w-3/4 m-auto"}
        onClick={() => banUser.mutate(id)}
        type={"submit"}
        text={"BAN"}
      />
    </div>
  );
}
