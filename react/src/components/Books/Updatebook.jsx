import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { axiosClient } from '../../utils/axiosClient';

const UpdateBook = ({ match }) => {
  const [book, setBook] = useState({});
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    description: '',
    cover: '',
    filePath: ''
  });
  const history = useHistory();

  useEffect(() => {
    const fetchBook = async () => {
      const result = await axiosClient.get(`/api/books/${match.params.id}`);
      console.log(match.params.id);
      setBook(result.data);
      setFormData({
        title: result.data.title,
        author: result.data.author,
        genre: result.data.genre,
        description: result.data.description,
        cover: result.data.cover,
        filePath: result.data.filePath
      });
    };

    fetchBook();
  }, [match.params.id]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axiosClient.put(`/api/books/${match.params.id}`, formData);
      history.push('/books'); // Redirect to '/books' after the update
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  return (
    <div>
      <h2>Update Book</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" name="title" value={formData.title} onChange={handleChange} />
        </label>
        <label>
          Author:
          <input type="text" name="author" value={formData.author} onChange={handleChange} />
        </label>
        <label>
          Genre:
          <input type="text" name="genre" value={formData.genre} onChange={handleChange} />
        </label>
        <label>
          Description:
          <textarea name="description" value={formData.description} onChange={handleChange} />
        </label>
        <label>
          Cover:
          <input type="text" name="cover" value={formData.cover} onChange={handleChange} />
        </label>
        <label>
          File Path:
          <input type="text" name="filePath" value={formData.filePath} onChange={handleChange} />
        </label>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateBook;
