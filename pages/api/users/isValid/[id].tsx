import { Request, Response } from "express";
import { isValidUser } from "pages/api/controllers/users";

export default async function handler(req: Request, res: Response) {
  if (req.method === "GET") {
    try {
      const user = await isValidUser(req, res);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving user", error });
    }
  }
}
