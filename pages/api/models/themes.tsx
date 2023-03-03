import { Schema, Model, model, models } from "mongoose";

interface IThemes {
  timestamp: Date;
  themeName: string;
  iColor: string;
  jColor: string;
  lColor: string;
  oColor: string;
  sColor: string;
  tColor: string;
  zColor: string;
  boardBGColor: string;
}

const themesSchema: Schema<IThemes> = new Schema({
    timestamp: {
        type: Date,
        default: Date.now,
    },
    themeName: {
        type: String,
        required: true,
    },
    iColor: {
        type: String,
        required: true,
    },
    jColor: {
        type: String,
        required: true,
    },
    lColor: {
        type: String,
        required: true,
    },
    oColor: {
        type: String,
        required: true,
    },
    sColor: {
        type: String,
        required: true,
    },
    tColor: {
        type: String,
        required: true,
    },
    zColor: {
        type: String,
        required: true,
    },
    boardBGColor: {
        type: String,
        required: true,
    }
});

const Themes: Model<IThemes> =
  models.Themes || model<IThemes>("Themes", themesSchema);

export { Themes };
export type { IThemes };
