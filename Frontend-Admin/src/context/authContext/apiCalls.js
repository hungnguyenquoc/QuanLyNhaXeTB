import axios from "../../axios";
import { loginFailure, loginStart, loginSuccess } from "./AuthActions";

export const login = async (user, dispatch) => {
  // dispatch(loginStart());
  try {
    const res = await axios.post("/api/NhanVien/Login", user);
    console.log('res login',res);
    dispatch(loginSuccess(res.data));
    console.log('res login dispatch', dispatch(loginSuccess(res.data)));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export default login;