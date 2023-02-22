import { Request, Response } from "express";
import { topTenScores } from "../../controllers/scores";

export default async function handler(req: Request, res: Response) {
  if (req.method === "GET") {
    await topTenScores(req, res);
  }
}
