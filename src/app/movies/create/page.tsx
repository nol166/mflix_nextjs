// src/app/movies/create/page.tsx
"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const CreateMoviePage = () => {
  const [title, setTitle] = useState("");
  const [poster, setPoster] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidURL(poster)) {
      setError("Invalid image URL. Please enter a valid URL.");
      return;
    }

    setError("");
    console.log("Submitting movie:", { title, poster });
    try {
      const response = await axios.post("/api/movie", { title, poster });
      console.log("Movie created successfully:", response.data);
      router.push("/movies");
    } catch (error) {
      console.error("Error creating movie:", error);
    }
  };

  const isValidURL = (url: string) => {
    const pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return !!pattern.test(url);
  };

  return (
    <div className="create-movie-container">
      <h1>Create Movie</h1>
      <form onSubmit={handleSubmit} className="create-movie-form">
        <div className="form-group">
          <label htmlFor="title">title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="poster">poster URL</label>
          <input
            type="text"
            id="poster"
            value={poster}
            onChange={(e) => setPoster(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="submit-button">
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateMoviePage;
