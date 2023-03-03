import { Request, Response } from "express";
import { allThemes } from "../controllers/themes";

export default async function handler(req: Request, res: Response) {
  if (req.method === "GET") {
    await allThemes(req, res);
  }
}
