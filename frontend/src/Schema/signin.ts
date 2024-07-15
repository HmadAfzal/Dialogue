import { z } from "zod"

const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;

export const SigninSchema=z.object({
username:z.string().regex(usernameRegex,{message:"Username can only contain letters, numbers, and underscores"}).max(20,{message:'must be 3-20 characters long'}).min(3,{message:'must be 3-20 characters long'}),
password:z.string().min(8),
})


export interface signinFormInput {
	username: String,
	password: String,
}