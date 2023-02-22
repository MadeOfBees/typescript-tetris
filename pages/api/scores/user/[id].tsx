import { Request, Response } from "express";
import { seeAllUserScores } from "../../controllers/scores";

export default async function handler(req: Request, res: Response) {
  if (req.method === "GET") {
    await seeAllUserScores(req, res);
  }
}
