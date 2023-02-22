import { Request, Response } from "express";
import { User, IUser } from "../models/user";
import connectionJS from "../../../utils/connection";

export async function newUser(req: Request, res: Response): Promise<void> {
  try {
    const db = await connectionJS();
    const newUser = await User.create(req.body as IUser);
    db.disconnect();
    res.status(200).json({ message: "User created successfully", newUser });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
}

export async function allUsers(req: Request, res: Response): Promise<void> {
  if (req.body.password === process.env.SPASSWORD) {
    try {
      const db = await connectionJS();
      const users = await User.find();
      db.disconnect();
      res.status(200).json({ message: "Users retrieved successfully", users });
    } catch (error) {
      res.status(500).json({ message: "Error retrieving users", error });
    }
  } else {
    res.status(401).json({ message: "Unauthorized user, access denied." });
  }
}

export async function userbyID(req: Request, res: Response): Promise<void> {
  if (req.body.password === process.env.SPASSWORD) {
    try {
      const db = await connectionJS();
      const user = await User.findById(req.query.id);
      db.disconnect();
      res.status(200).json({ message: "User retrieved successfully", user });
    } catch (error) {
      res.status(500).json({ message: "Error retrieving user", error });
    }
  } else {
    res.status(401).json({ message: "Unauthorized user, access denied." });
  }
}

export async function deleteByID(req: Request, res: Response): Promise<void> {
  if (req.body.password === process.env.SPASSWORD) {
    try {
      const db = await connectionJS();
      const user = await User.findByIdAndDelete(req.query.id);
      db.disconnect();
      res.status(200).json({ message: "User deleted successfully", user });
    } catch (error) {
      res.status(500).json({ message: "Error deleting user", error });
    }
  } else {
    res.status(401).json({ message: "Unauthorized user, access denied." });
  }
}

export async function deleteAll(req: Request, res: Response): Promise<void> {
  if (req.body.password === process.env.SPASSWORD) {
    try {
      const db = await connectionJS();
      const users = await User.deleteMany();
      db.disconnect();
      res.status(200).json({ message: "Users deleted successfully", users });
    } catch (error) {
      res.status(500).json({ message: "Error deleting users", error });
    }
  } else {
    res.status(401).json({ message: "Unauthorized user, access denied." });
  }
}

export async function isValidUser(req: Request, res: Response): Promise<void> {
  try {
    const db = await connectionJS();
    const user = await User.findById(req.query.id);
    db.disconnect();
    if (user) {
      res.status(200).json({ valid: true });
    } else {
      res.status(200).json({ valid: false });
    }
  } catch (error) {
    res.status(500).json({ message: "Error finding user", error: error as Error });
  }
}

