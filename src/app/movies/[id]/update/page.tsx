"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import styles from "./page.module.css";

interface MovieComponentProps {
  poster: string;
  title: string;
}

const MovieComponent = ({ poster, title }: MovieComponentProps) => {
  return (
    <div className={styles["movie-container"]}>
      <div className={styles["image-input-wrapper"]}>
        <Image
          src={poster}
          alt={title}
          width={300}
          height={450}
          className={styles["movie-poster-preview"]}
        />
      </div>
    </div>
  );
};

const GenresComponent = ({ genres }: { genres: string[] }) => {
  return (
    <ul className="genres-list">
      {genres.map((genre, index) => (
        <li key={index} className="genre-item">
          {genre}
        </li>
      ))}
    </ul>
  );
};

const UpdateMoviePage = () => {
  const [title, setTitle] = useState("");
  const [poster, setPoster] = useState("");
  const [plot, setPlot] = useState("");
  const [genres, setGenres] = useState([]);
  const [year, setYear] = useState();
  const [error, setError] = useState("");
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (!id) return;

    axios
      .get(`/api/movie/${id}`)
      .then((response) => {
        const movie = response.data;
        setTitle(movie.title);
        setPoster(movie.poster);
        setPlot(movie.plot);
        setGenres(movie.genres);
        setYear(movie.year);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await axios.put(`/api/movie/${id}`, { title, poster, genres });
      router.push("/movies");
    } catch (error) {
      console.error("Error updating movie:", error);
      setError("Error updating movie. Please try again.");
    }
  };

  return (
    <div className="movie-update-container">
      <h1>Update Movie</h1>
      <form onSubmit={handleSubmit} className="update-movie-form">
        <div className="form-group">
          <label htmlFor="name">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="plot">Plot</label>
          <input
            type="text"
            id="plot"
            value={plot}
            onChange={(e) => setPlot(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Poster URL</label>
          <input
            type="text"
            id="poster"
            value={poster}
            onChange={(e) => setPoster(e.target.value)}
            required
          />
          <div className="image-input-wrapper">
            <MovieComponent poster={poster} title={title} />
          </div>
          <GenresComponent genres={genres} />
        </div>
        {/* Add more fields as necessary */}
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="submit-button">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateMoviePage;
