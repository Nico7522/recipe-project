import { useFetchUser } from "../src/hooks/user-hooks";

export default function getToken(){
    const {config} = useFetchUser()
    return config
}