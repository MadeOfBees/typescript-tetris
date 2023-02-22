import { Request, Response } from "express";
import { todaysTopTenScores } from "../../controllers/scores";

export default async function handler(req: Request, res: Response) {
  if (req.method === "GET") {
    await todaysTopTenScores(req, res);
  }
}
