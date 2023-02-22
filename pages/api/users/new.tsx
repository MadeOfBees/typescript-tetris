import { Request, Response } from "express";
import { newUser } from "../controllers/users";
export default async function handler(
    req: Request,
    res: Response
) {
  if (req.method === "POST") {
    await newUser(req, res);
  } 
}