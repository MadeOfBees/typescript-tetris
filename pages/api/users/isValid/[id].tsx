import { Request, Response } from "express";
import { isValidUser } from "pages/api/controllers/users";

export default async function handler(req: Request, res: Response) {
  if (req.method === "GET") {
    await isValidUser(req, res);
  }
}
