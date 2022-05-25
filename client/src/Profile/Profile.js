import { Button } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { Logout } from "../Logout/Logout"
import { logout, selectLoggedInUser } from "../state/authSlice"

export const Profile = ({handler}) => 
{


	const user = useSelector(selectLoggedInUser);
	const userName = user.fullname;
	const email = user.email;
	return (<> <h1>
		Name: {userName} <br/>
		E-mail address: {email}
		
	</h1><br/> 
	<Button variant="contained" onClick ={handler}>Logout</Button>
	</>
	
	);
	
}