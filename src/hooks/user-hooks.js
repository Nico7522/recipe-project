import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export const useFetchUser = () => {
  const [token, setToken] = useState(null);
  const [userStatus, setUserStatus] = useState(null);
  const [userId, setUserId] = useState(null);

  const isLogged = useSelector((state) => state.user.user.token);
  const status = useSelector((state) => state.user.user.user?.status);
  const id = useSelector((state) => state.user.user.user?.id);
  const avatar = useSelector((state) => state.user.user.user?.avatar);
  const name = useSelector((state) => state.user.user.user?.name);
  const surname = useSelector((state) => state.user.user.user?.surname);
  const fullName = `${name} ${surname}`;
 
  const config = {
    withCredential: true,
    headers: {
      "content-type": "application/json",
      'Authorization': `Bearer ${isLogged}`,
      
    },
  };

  useEffect(() => {
    if (isLogged) {
      setToken(isLogged);
      setUserStatus(status);
      setUserId(id);
    }
  }, [token, isLogged, avatar]);

  return { userId, token, userStatus, avatar, fullName, config };
};
