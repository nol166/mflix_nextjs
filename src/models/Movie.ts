// src/models/Movie.ts
import mongoose, { Schema, Document } from 'mongoose';

interface IMovie extends Document {
  name: string;
  poster: string;
  year: number;
  plot: string;
  genres: string[];
}

const MovieSchema: Schema = new Schema({
  name: { type: String, required: true },
  poster: { type: String, required: true },
  year: { type: Number, required: true },
  plot: { type: String, required: true },
  genres: { type: [String], required: true },
});

export default mongoose.models.Movie || mongoose.model<IMovie>('Movie', MovieSchema, 'movies');