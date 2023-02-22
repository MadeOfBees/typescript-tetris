import { Schema, Model, model, models,} from "mongoose";

interface IUser {
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

