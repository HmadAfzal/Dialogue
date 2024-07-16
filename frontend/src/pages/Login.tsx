import { Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from "axios";
import { useAppDispatch } from "../redux/hooks";
import { useState } from "react";
import { ApiResponse } from "../Schema/ApiResponse";
import { initializeUser } from "../redux/userslice";
import {useNavigate} from 'react-router-dom'
import toast from "react-hot-toast";
import { signinFormInput, SigninSchema } from "../Schema/signin";
const Login = () => {


	const { register, handleSubmit,formState: { errors }, } = useForm<signinFormInput>({ resolver: zodResolver(SigninSchema) });
	const [loading, setLoading]=useState(false)
	const dispatch = useAppDispatch()
const navigate=useNavigate();

	const onFormSubmit = async (data: signinFormInput) => {
		try {
			setLoading(true)
			const response = await axios.post<ApiResponse>('/api/auth/log-in', data)
			dispatch(initializeUser(response.data))
			navigate('/')

		} catch (error:any) {
			console.log(error.response.data.error)
			toast.error(error.response.data.error);
		} finally{
			setLoading(false)
		}

	}

	return (
		<div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
			<div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 flex flex-col justify-center gap-8'>
				<h1 className='text-4xl font-bold text-center text-gray-300'>
					Login
					<span className='text-[#249f8b]'> ChatApp</span>
				</h1>

				<form onSubmit={handleSubmit(onFormSubmit)}>
				<div>
						<input
							type='text'
							placeholder='Username'
							className='w-full input input-bordered h-10 mb-4'
							{...register('username')}
						/>
						 <p className="pb-4 text-red-600">{errors.username?.message}</p>
					</div>

					<div>
						<input
							type='password'
							placeholder='Password'
							className='w-full input input-bordered h-10 mb-4'
							{...register('password')}
						/>
						 <p className=" text-red-600">{errors.password?.message}</p>
					</div>
					<Link
						to='/signup'
						className='text-sm  hover:underline text-white hover:text-[#3bb9a4] mt-2 inline-block'
					>
						{"Don't"} have an account?
					</Link>

					<div>
						<button className='btn btn-block btn-sm mt-2' type="submit" disabled={loading}>{loading ? 'loading...' : 'Login'}</button>
					</div>
				</form>
			</div>
		</div>
	);
};
export default Login;
