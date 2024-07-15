import { Request, Response } from "express";
import prisma from "../db/prisma.js";
import bcrypt from "bcryptjs";
import genJwtToken from "../utils/GenJwtToken.js";

export const signup = async (req: Request, res: Response) => {
  try {
    const { username, fullname, password, confirmPassword, gender } = req.body;
    if (!username || !fullname || !password || !confirmPassword || !gender) {
      return res
        .status(400)
        .json({ error: "Please fill all the required fields" });
    }

    const usernameExists = await prisma.user.findUnique({
      where: { username },
    });
    if (usernameExists) {
      return res.status(400).json({ error: "Username is already taken" });
    }
    const passwordDoesNotMatch = password !== confirmPassword;
    if (passwordDoesNotMatch) {
      return res.status(400).json({ error: "Password does not match" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const girlPfp = `https://avatar.iran.liara.run/public/girl?username=${username}`;
    const boyPfp = `https://avatar.iran.liara.run/public/boy?username=${username}`;

    const newUser = await prisma.user.create({
      data: {
        username,
        fullname,
        password: hashedPassword,
        gender,
        profilepic: gender == "male" ? boyPfp : girlPfp,
      },
    });

    if (newUser) {
      genJwtToken(newUser.id, res);
      return res.status(201).json({
        id: newUser.id,
        fullName: newUser.fullname,
        username: newUser.username,
        profilePic: newUser.profilepic,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error: any) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Please fill all the required fields" });
    }
    const user = await prisma.user.findUnique({
      where: { username },
    });
    if (!user) {
      return res.status(400).json({ error: "Username incorrect" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Password incorrect" });
    }

    genJwtToken(user.id, res);

    return res.status(201).json({
      id: user.id,
      fullName: user.fullname,
      username: user.username,
      profilePic: user.profilepic,
    });
  } catch (error: any) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logout = async(req: Request, res: Response) => {
try {
  res.cookie("jwt", "", { maxAge: 0 });
  return res
  .status(200)
  .json({ message: "Logged out successfully" });
  
} catch (error:any) {
  console.log("Error in logout controller", error.message);
  res.status(500).json({ error: "Internal Server Error" });
}
};


export const getMe= async(req: Request, res: Response)=>{
try {
  const id=req.user.id;
  if(!id){
    return res.status(400).json({ error: "Unauthorized - Invalid Token" });
  }

  const user=await prisma.user.findUnique({where:{id}})
  if(!user){
    return res.status(400).json({ error: "User not found - Login again" });
  }

  res.status(200).json({
    id: user.id,
    fullName: user.fullname,
    username: user.username,
    profilePic: user.profilepic,
  });
} catch (error:any) {
  console.log("Error in logout controller", error.message);
  res.status(500).json({ error: "Internal Server Error" });
}
}