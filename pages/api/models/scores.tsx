import { Schema, Model, model, Document } from "mongoose";

interface IScores {
  score: number;
  userID: string;
  timestamp?: Date;
}

interface ScoresAttrs extends IScores {}

interface ScoresDoc extends Document, IScores {}

interface ScoresModel extends Model<ScoresDoc> {
  createScore(attrs: ScoresAttrs): Promise<ScoresDoc>;
}

const scoresSchema = new Schema<ScoresDoc, ScoresModel>({
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

scoresSchema.statics.createScore = function (attrs: ScoresAttrs) {
  const { score, userID, timestamp } = attrs;
  const newScore = new Scores({ score, userID, timestamp });
  return newScore.save();
};

const Scores = model<ScoresDoc, ScoresModel>("Scores", scoresSchema);

export { Scores };
export type { IScores };
