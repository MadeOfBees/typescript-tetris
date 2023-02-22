import { Request, Response } from "express";
import { topTenScores } from "../../controllers/scores";

export default async function handler(req: Request, res: Response) {
  if (req.method === "GET") {
    try {
      const scores = await topTenScores(req, res);
      res.status(200).json(scores);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error retrieving top ten scores", error });
    }
  }
}
