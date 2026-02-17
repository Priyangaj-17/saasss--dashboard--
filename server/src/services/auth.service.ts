import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { Organization } from "../models/organisation";
import mongoose from "mongoose";

export const signup = async ({
  name,
  email,
  password,
  orgName,
}: any) => {
  
  // 1. Check user
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }
   
  // 2. Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  // 3. Create user temporarily without org
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: "admin",
    organizationId: new mongoose.Types.ObjectId(), // temporary
  });
  //4. Create organization
  const organization = await Organization.create({
    name: orgName,
    ownerId: user._id, // temporary
  });

  // 5. Update org owner
  organization.ownerId = user._id;
  await organization.save();

  return user;
};
