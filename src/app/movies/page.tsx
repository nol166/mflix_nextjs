"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";

interface Movie {
  _id: string;
  title: string;
  poster: string;
  year: number;
  plot: string;
  genres: { genre: { title: string } }[];
}

const MoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Fetching movies...");
    axios
      .get("/api/movie")
      .then((response) => {
        console.log("Movies fetched successfully:", response.data);
        setMovies(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching movies:", err);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/movie/${id}`);
      setMovies(movies.filter((movie) => movie._id !== id));
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="movies-container">
      <h1>Movies</h1>
      <Link href="/movies/create" className="add-movie-button">
        Add Movie
      </Link>
      {movies.length === 0 ? (
        <p>No movies available</p>
      ) : (
        <div className="movies-list">
          {movies.map((movie) => (
            <div key={movie._id} className="movie-card">
              <h2>{movie.title}</h2>
              <Image
                src={movie.poster}
                alt={movie.title}
                width={300}
                height={450}
                className="movie-poster"
              />
              <Link href={`/movies/${movie._id}`} className="view-link">
                View
              </Link>
              <Link
                href={`/movies/${movie._id}/update`}
                className="update-link"
              >
                Update
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MoviesPage;
