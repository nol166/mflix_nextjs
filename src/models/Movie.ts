import mongoose, { Schema, Document, model } from "mongoose";

interface IMovie extends Document {
  title: string;
  poster: string;
  year: number;
  plot: string;
  genres: { genre: { title: string } }[];
}

const MovieSchema: Schema = new Schema({
  title: { type: String, required: true },
  poster: { type: String, required: true },
  plot: { type: String, required: true },
  year: { type: Number, required: true },
  genres: [{ genre: { title: String } }],
});

// Explicitly specify the collection title
export default mongoose.models.Movie ||
  model<IMovie>("Movie", MovieSchema, "movies");
