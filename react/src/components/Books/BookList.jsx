import React, { useState, useEffect } from 'react';
import { axiosClient } from '../../utils/axiosClient';

const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 10; // Number of books to display per page

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axiosClient.get('/books/bookList');
        setBooks(res.data.books);
      } catch (err) {
        console.error('Error fetching books:', err);
      }
    };
          
    fetchBooks();
  }, []);

  // Get current books
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  // Calculate total pages
  const totalPages = Math.ceil(books.length / booksPerPage);

  // Generate array of page numbers
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Books</h2>
      <ul style={{ listStyleType: 'none', padding: '0', margin: '0' }}>
        {currentBooks.map(book => (
          <li key={book._id} style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
            <h3>{book.title}</h3>
            <p>Author: {book.author}</p>
            <p>Genre: {book.genre}</p>
            <p>Description: {book.description}</p>
            <img src={book.cover} alt={book.title} style={{ maxWidth: '200px', maxHeight: '200px', marginBottom: '10px' }} />
            <p>File Path: {book.filePath}</p>
          </li>
        ))}
      </ul>
      <ul style={{ display: 'flex', justifyContent: 'center', listStyleType: 'none', padding: '0', marginTop: '20px' }}>
        {pageNumbers.map(number => (
          <li key={number} style={{ margin: '0 5px' }}>
            <button onClick={() => paginate(number)} style={{ padding: '5px 10px', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}>{number}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BooksList;
