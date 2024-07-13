import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import prisma from "../db/prisma.js";

interface DecodedToken extends JwtPayload {  // Telling that decoded user will have userId
  id: string;
}

declare global {         // Declaring global interface for request
  namespace Express {
    export interface Request {
      user: {
        id: string;
        username?: string;
        fullname?: string;
        profilepic?: string;
      };
    }
  }
}

const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized - No token provided" });
    }

    const decodedUser = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
    if (!decodedUser) {
      return res.status(401).json({ error: "Unauthorized - Invalid Token" });
    }

    const user = await prisma.user.findUnique({
      where: { id: decodedUser.id },
      select: { id: true, username: true, fullname: true, profilepic: true }
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    req.user = user;
    next();
  } catch (error: any) {
    console.log("Error in isAuthenticated middleware", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default isAuthenticated;
