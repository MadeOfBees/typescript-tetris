import { Request, Response } from "express";
import { allScores, deleteAll } from "../controllers/scores";

export default async function handler(req: Request, res: Response) {
  if (req.method === "GET") {
    try {
      const users = await allScores(req, res);
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving users", error });
    }
  }
  if (req.method === "DELETE") {
    try {
      const users = await deleteAll(req, res);
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: "Error deleting users", error });
    }
  }
}
