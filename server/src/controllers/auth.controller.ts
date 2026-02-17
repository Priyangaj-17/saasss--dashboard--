import { Request,response } from "express";
import bcryp from"bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

export const loginUser = async (req: Request, res: response) => {
  try{
    const {email,password,}=req.body;
  // Check if user exists 
    const user = await User.findOne({email});
    if(!user){
      return res.status(400).json({message:"Invalid credentials"});
    }
    // Compare password
    const passwordMatch = await bcryp.compare(password,user.password);
    if(!passwordMatch){
      return res.status(400).json({message:"Invalid credentials"});
    }
        // create JWT Token-very important for authentication and authorization
    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
        organizationId: user.organizationId,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    // Send response (without password)
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
};
  