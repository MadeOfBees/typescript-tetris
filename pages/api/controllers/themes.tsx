import { Request, Response } from "express";
import { Themes, IThemes } from "../models/themes";
import connectionJS from "../../../utils/connection";

export async function newTheme(req: Request, res: Response): Promise<void> {
  try {
    const db = await connectionJS();
    const newTheme: IThemes = (await Themes.create(req.body)) as IThemes;
    res.status(200).json({ message: "Theme created successfully", newTheme });
    db.disconnect();
  } catch (error) {
    res.status(500).json({ message: "Error creating theme", error });
  }
}

export async function themebyID(req: Request, res: Response): Promise<void> {
  try {
    const db = await connectionJS();
    const theme: IThemes | null = await Themes.findById(req.query.id);
    res.status(200).json({ message: "Theme retrieved successfully", theme });
    db.disconnect();
  } catch (error) {
    res.status(500).json({ message: "Error retrieving theme", error });
  }
}

export async function allThemes(req: Request, res: Response): Promise<void> {
  try {
    const db = await connectionJS();
    const themes: IThemes[] = await Themes.find();
    res.status(200).json({ message: "Themes retrieved successfully", themes });
    db.disconnect();
  } catch (error) {
    res.status(500).json({ message: "Error retrieving themes", error });
  }
}

export async function deleteThemeByID(
  req: Request,
  res: Response
): Promise<void> {
  if (req.body.password === process.env.SPASSWORD) {
    try {
      const db = await connectionJS();
      const theme: IThemes | null = await Themes.findByIdAndDelete(
        req.query.id
      );
      res.status(200).json({ message: "Theme deleted successfully", theme });
      db.disconnect();
    } catch (error) {
      res.status(500).json({ message: "Error deleting theme", error });
    }
  } else {
    res.status(401).json({ message: "Unauthorized user, access denied." });
  }
}
