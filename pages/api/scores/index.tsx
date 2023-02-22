import { Request, Response } from "express";
import { allScores, deleteAll } from "../controllers/scores";

export default async function handler(req: Request, res: Response) {
  if (req.method === "GET") {
    await allScores(req, res);
  }
  if (req.method === "DELETE") {
    await deleteAll(req, res);
  }
}
