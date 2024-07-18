import { Link } from "react-router-dom";
import GenderCheckbox from "../components/GenderCheckbox";
import { useForm } from 'react-hook-form';
import { signupFormInput, SignupSchema } from "../Schema/signup";
import { zodResolver } from '@hookform/resolvers/zod';
import axios from "axios";
import { useAppDispatch } from "../redux/hooks";
import { useState } from "react";
import { ApiResponse } from "../Schema/ApiResponse";
import { initializeUser } from "../redux/userslice";
import { useNavigate } from 'react-router-dom'
import toast from "react-hot-toast";

const SignUp = () => {
	const { register, handleSubmit, formState: { errors }, } = useForm<signupFormInput>({ resolver: zodResolver(SignupSchema) });
	const [loading, setLoading] = useState(false)
	const dispatch = useAppDispatch()
	const navigate = useNavigate();

	const onFormSubmit = async (data: signupFormInput) => {
		try {
			setLoading(true)
			const response = await axios.post<ApiResponse>('/api/auth/sign-up', data)
			dispatch(initializeUser(response.data))
			navigate('/')

		} catch (error: any) {
			console.log(error.response.data.error)
			toast.error(error.response.data.error);
		} finally {
			setLoading(false)
		}

	}

	return (
		<div className='flex flex-col items-center justify-center min-w-96 max-w-96 mx-auto'>
			<div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 flex flex-col justify-center gap-8'>
				<h1 className='text-4xl font-bold text-center text-gray-300'>
					Sign Up <span className='text-[#249f8b]'> Dialogue</span>
				</h1>

				<form onSubmit={handleSubmit(onFormSubmit)} className="w-[100%]" >
					<div>
						<input
							type='text'
							placeholder="Name"
							className='w-full input input-bordered h-10'
							{...register('fullname')}
						/>
						<p className="pb-4 text-red-600">{errors.fullname?.message}</p>
					</div>

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
							placeholder='Enter Password'
							className='w-full input input-bordered h-10 mb-4'
							{...register('password')}
						/>
						<p className="pb-4 text-red-600">{errors.password?.message}</p>
					</div>

					<div>
						<input
							type='password'
							placeholder='Confirm Password'
							className='w-full input input-bordered h-10 mb-4'
							{...register('confirmPassword')}
						/>
						<p className="pb-4 text-red-600">{errors.confirmPassword?.message}</p>
					</div>

					<GenderCheckbox register={register} />

					<Link
						to={"/login"}
						className='text-sm hover:underline hover:text-[#3bb9a4] my-2 inline-block text-white'
					>
						Already have an account?
					</Link>

					<div>
						<button className='btn btn-block btn-sm mt-2 border py-2 border-slate-700' type="submit" disabled={loading}>
							{loading ? 'loading...' : 'Create Account'}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default SignUp;
