"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";

interface Movie {
  _id: string;
  title: string;
  poster: string;
  year: number;
  plot: string;
  genres: string[];
}

const MovieDetailsPage = () => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const params = useParams();
  const { id } = params;
  const router = useRouter();

  useEffect(() => {
    if (!id) return;

    console.log(`Fetching movie with id: ${id}`);

    axios
      .get(`/api/movie/${id}`)
      .then((response) => setMovie(response.data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!movie) return <div className="loading">Loading...</div>;

  return (
    <div className="movie-details-container">
      <h1>{movie.title}</h1>
      <Image
        src={movie.poster}
        alt={movie.title}
        width={300}
        height={450}
        className="movie-image"
      />
      <h2>Genres</h2>
      <ul className="genres-list">
        {movie.genres.map((genre, index) => (
          <li key={index} className="genre-item">
            {genre}
          </li>
        ))}
      </ul>
      <h4>{movie.year}</h4>
      <p>{movie.plot}</p>
      <button onClick={() => router.push("/movies")}>Back</button>
    </div>
  );
};

export default MovieDetailsPage;
