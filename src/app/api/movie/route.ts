// src/app/api/movie/route.ts
import { NextResponse } from "next/server";
import dbConnect from "../../../utils/db";
import Movie from "../../../models/Movie";

export async function POST(req: Request) {
  await dbConnect();

  const { name, poster, year, plot, genres } = await req.json();
  const newMovie = new Movie({
    name,
    poster,
    year,
    plot,
    genres,
  });

  await newMovie.save();
  return NextResponse.json(newMovie, { status: 201 });
}

export async function GET() {
  await dbConnect();

  const currentYear = new Date().getFullYear();
  const thresholdYear = currentYear - 10;

  const movies = await Movie.aggregate([
    {
      $match: {
        "imdb.rating": { $gt: 8 },
        poster: { $exists: true, $ne: "" },
        year: { $gte: thresholdYear },
      },
    },
    {
      $sort: { "imdb.rating": -1 },
    },
    {
      $group: {
        _id: "$title",
        doc: { $first: "$$ROOT" },
      },
    },
    {
      $replaceRoot: { newRoot: "$doc" },
    },
    {
      $limit: 40,
    },
  ]);

  return NextResponse.json(movies, { status: 200 });
}
