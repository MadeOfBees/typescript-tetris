import { Schema, Model, model, models,} from "mongoose";

interface IScores {
  score: number;
  userID: string;
  timestamp?: Date;
}

const scoresSchema: Schema<IScores> = new Schema({
  score: {
    type: Number,
    required: true,
  },
  userID: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Scores: Model<IScores> = models.Scores || model<IScores>("Scores", scoresSchema);

export { Scores };
export type { IScores };
