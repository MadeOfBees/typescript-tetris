import { Request, Response } from "express";
import { Scores, IScores } from "../models/scores";
import connectionJS from "../../../utils/connection";

export async function newScore(req: Request, res: Response): Promise<void> {
  try {
    const db = await connectionJS();
    const newScore: IScores = await Scores.create(req.body) as IScores;
    res.status(200).json({ message: "Score created successfully", newScore });
    db.disconnect();
  } catch (error) {
    res.status(500).json({ message: "Error creating score", error });
  }
}

export async function scorebyID(req: Request, res: Response): Promise<void> {
  if (req.body.password === process.env.SPASSWORD) {
    try {
      const db = await connectionJS();
      const score: IScores | null = await Scores.findById(req.query.id);
      res.status(200).json({ message: "Score retrieved successfully", score });
      db.disconnect();
    } catch (error) {
      res.status(500).json({ message: "Error retrieving score", error });
    }
  } else {
    res.status(401).json({ message: "Unauthorized user, access denied." });
  }
}

export async function allScores(req: Request, res: Response): Promise<void> {
  if (req.body.password === process.env.SPASSWORD) {
    try {
      const db = await connectionJS();
      const scores: IScores[] = await Scores.find();
      res
        .status(200)
        .json({ message: "Scores retrieved successfully", scores });
      db.disconnect();
    } catch (error) {
      res.status(500).json({ message: "Error retrieving scores", error });
    }
  } else {
    res.status(401).json({ message: "Unauthorized user, access denied." });
  }
}

export async function topTenScores(req: Request, res: Response): Promise<void> {
  try {
    const db = await connectionJS();
    const scores: IScores[] = await Scores.find().sort({score: -1}).limit(10);
    res
      .status(200)
      .json({ message: "Top ten scores retrieved successfully", scores });
    db.disconnect();
  } catch (error) {
    res.status(500).json({ message: "Error retrieving top ten scores", error });
  }
}

export async function todaysTopTenScores(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const db = await connectionJS();
    const currentDate: Date = new Date();
    const offset: number = -5;
    const estTime: Date = new Date(
      currentDate.getTime() + offset * 60 * 60 * 1000
    );
    const scores: IScores[] = await Scores.find({
      timestamp: { $gte: estTime },
    })
      .sort({ score: -1 })
      .limit(10);
    res
      .status(200)
      .json({ message: "Top ten scores retrieved successfully", scores });
    db.disconnect();
  } catch (error) {
    res.status(500).json({ message: "Error retrieving top ten scores", error });
  }
}

export async function deleteByID(req: Request, res: Response): Promise<void> {
  if (req.body.password === process.env.SPASSWORD) {
    try {
      const db = await connectionJS();
      const score: IScores | null = await Scores.findByIdAndDelete(
        req.query.id
      );
      res.status(200).json({ message: "Score deleted successfully", score });
      db.disconnect();
    } catch (error) {
      res.status(500).json({ message: "Error deleting score", error });
    }
  } else {
    res.status(401).json({ message: "Unauthorized user, access denied." });
  }
}

export async function deleteAll(req: Request, res: Response): Promise<void> {
  if (req.body.password === process.env.SPASSWORD) {
    try {
      const db = await connectionJS();
      const score: IScores | null = await Scores.findByIdAndDelete();
      await Scores.deleteMany({});
      res.status(200).json({ message: "Scores deleted successfully", score });
      db.disconnect();
    } catch (error) {
      res.status(500).json({ message: "Error deleting scores", error });
    }
  } else {
    res.status(401).json({ message: "Unauthorized user, access denied." });
  }
}

export async function seeAllUserScores(
  req: Request,
  res: Response
): Promise<void> {
  if (req.body.password === process.env.SPASSWORD) {
    try {
      const db = await connectionJS();
      const scores: IScores[] = await Scores.find({ user: req.query.user });
      res
        .status(200)
        .json({ message: "Scores retrieved successfully", scores });
      db.disconnect();
    } catch (error) {
      res.status(500).json({ message: "Error retrieving scores", error });
    }
  } else {
    res.status(401).json({ message: "Unauthorized user, access denied." });
  }
}