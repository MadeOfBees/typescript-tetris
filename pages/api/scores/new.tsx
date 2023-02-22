import { Request, Response } from "express";
import { newScore } from "../controllers/scores";

export default async function handler(req: Request, res: Response) {
  if (req.method === "POST") {
    try {
      const score = await newScore(req, res);
      res.status(200).json(score);
    } catch (error) {
      res.status(500).json({ message: "Error creating score", error });
    }
  }
}
