import { z } from "zod"

const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;


export const SignupSchema=z.object({
fullname:z.string(),
username:z.string().regex(usernameRegex,{message:"Username can only contain letters, numbers, and underscores"}).max(20,{message:'must be 3-20 characters long'}).min(3,{message:'must be 3-20 characters long'}),
password:z.string().min(8),
confirmPassword:z.string().min(8),
gender:z.string()
})


export interface signupFormInput {
	fullname : String,
	username: String,
	password: String,
	confirmPassword: String,
	gender: String
}