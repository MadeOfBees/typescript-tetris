import { Request, Response } from "express";
import { allUsers, deleteAll } from "../controllers/users";

export default async function handler(req: Request, res: Response) {
  if (req.method === "GET") {
    await allUsers(req, res);
  }
  if (req.method === "DELETE") {
    await deleteAll(req, res);
  }
}
