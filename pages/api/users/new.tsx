import { Request, Response } from "express";
import { newUser } from "../controllers/users";

export default async function handler(
    req: Request,
    res: Response
) {
  if (req.method === "POST") {
    newUser(req, res);
  } else {
    res.status(401).json({ message: "Unauthorized user, access denied." });
  }
}
