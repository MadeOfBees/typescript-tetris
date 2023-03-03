import { Request, Response } from "express";
import { themebyID, deleteThemeByID } from "../controllers/themes";

export default async function handler(
  req: Request,
  res: Response
): Promise<void> {
  if (req.method === "GET") {
    await themebyID(req, res);
  } else if (req.method === "DELETE") {
    await deleteThemeByID(req, res);
  }
}
