import { Request, Response } from "express";
import { userbyID, deleteByID} from "../controllers/users";

export default async function handler(
  req: Request,
  res: Response
): Promise<void> {
  if (req.method === "GET") {
    try {
      const user = await userbyID(req, res);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving user", error });
    }
  } else if (req.method === "DELETE") {
    try {
      const user = await deleteByID(req, res);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Error deleting user", error });
    }
  }
}