import bcrypt from "bcrypt";
import { User } from "../models/User";

export const inviteUser = async (req: any, res: any) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user", // invited users are normal users
      organizationId: req.user.organizationId,
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Error inviting user" });
  }
};
