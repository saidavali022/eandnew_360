import axios from "@utils/defaultImports";
import { useSelector, useDispatch } from "react-redux";

const init_redux_users_list = () => {
  const dispatch = useDispatch();
  //   dispatch({ type: "login", payload: response.data });
  axios.get(`/users/info`, { status: "accepted" }).then((res: any) => {
    dispatch({ type: "users", payload: res.data });
  });
};
