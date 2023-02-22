import { Request, Response } from "express";
import { newScore } from "../controllers/scores";

export default async function handler(req: Request, res: Response) {
  if (req.method === "POST") {
    await newScore(req, res);
  }
}
