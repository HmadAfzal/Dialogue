import axios from "axios";
import { LogOut } from "lucide-react";
import toast from "react-hot-toast";
import { useAppDispatch } from "../../redux/hooks";
import { removeUser } from "../../redux/userslice";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
	const dispatch=useAppDispatch()
	const navigate=useNavigate()
	const logout = async() => {
		try {
			const response=await axios.post('/api/auth/logout')
			dispatch(removeUser())
			toast.success(response.data.message);
			navigate('/login')	
		} catch (error:any) {
			console.log(error)
			toast.error(error.response.data.error);
		}
	};

	return (
		<div className='mt-auto' onClick={logout}>
			<LogOut className='w-6 h-6 text-white cursor-pointer' onClick={logout} />
		</div>
	);
};
export default LogoutButton;
