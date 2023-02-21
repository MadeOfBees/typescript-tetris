import { Schema, Model, model, models, Document } from "mongoose";

interface IUser extends Document {
  timestamp: Date;
}

const userSchema: Schema<IUser> = new Schema({
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const User: Model<IUser> = models.User || model<IUser>("User", userSchema);

export { User};
export type { IUser };

