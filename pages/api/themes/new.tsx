import { Request, Response } from "express";
import { newTheme } from "../controllers/themes";

export default async function handler(req: Request, res: Response) {
  if (req.method === "POST") {
    await newTheme(req, res);
  }
}
