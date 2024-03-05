import React, { useState } from "react";
import "./Form.css"; // Import your CSS file
import { axiosClient } from "../../utils/axiosClient";

const AddBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");
  const [cover, setCover] = useState("");
  const [filePath, setFilePath] = useState("");

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    
      const response = await axiosClient.post("/admin/books/add", {
        title,
        author,
        genre,
        description,
        cover,
        filePath,
      },{withCredentials:true})
      console.log("Book added:", response.data.book);
      setTitle("");
      setAuthor("");
      setGenre("");
      setDescription("");
      setCover("");
      setFilePath("");
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  return (
    <div className="form-box">
      <h2>Add a Book</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label>Author:</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <label>Genre:</label>
        <input
          type="text"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <label>Cover Image URL:</label>
        <input
          type="text"
          value={cover}
          onChange={(e) => setCover(e.target.value)}
        />
        <label>File Path:</label>
        <input
          type="text"
          value={filePath}
          onChange={(e) => setFilePath(e.target.value)}
        />
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBook;
