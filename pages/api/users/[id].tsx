import { Request, Response } from "express";
import { userbyID, deleteByID} from "../controllers/users";

export default async function handler(
  req: Request,
  res: Response
): Promise<void> {
  if (req.method === "GET") {
    await userbyID(req, res);
  } else if (req.method === "DELETE") {
    await deleteByID(req, res);
  }
}