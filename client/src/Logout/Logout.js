import { useDispatch } from "react-redux"
import { logout } from "../state/authSlice";

export const Logout = ({handler}) =>
{
  handler();
}