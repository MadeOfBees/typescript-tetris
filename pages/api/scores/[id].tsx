import { Request, Response } from "express";
import { scorebyID, deleteByID } from "../controllers/scores";

export default async function handler(
  req: Request,
  res: Response
): Promise<void> {
  if (req.method === "GET") {
    await scorebyID(req, res);
  } else if (req.method === "DELETE") {
    await deleteByID(req, res);
  }
}
