import React, { useState, useEffect } from 'react';
import { axiosClient } from '../../utils/axiosClient';
import {React , useState, useEffect } from 'react';

export const BooksList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axiosClient.get('/bookList/bookList');
        
        const BooksList = () => {
          const [books, setBooks] = useState([]);
          const [currentPage, setCurrentPage] = useState(1);
          const [booksPerPage] = useState(10); // Number of books to display per page
        
          useEffect(() => {
            const fetchBooks = async () => {
              try {
                const res = await axiosClient.get('/bookList/bookList');
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
        
          return (
            <div>
              <h2>Books</h2>
              <ul>
                {currentBooks.map(book => (
                  <li key={book._id}>
                    <h3>{book.title}</h3>
                    <p>Author: {book.author}</p>
                    <p>Genre: {book.genre}</p>
                    <p>Description: {book.description}</p>
                    <img src={book.cover} alt={book.title} />
                    <p>File Path: {book.filePath}</p>
                  </li>
                ))}
              </ul>
              <ul>
                {booksPerPage.map(number => (
                  <li key={number}>
                    <button onClick={() => paginate(number)}>{number}</button>
                  </li>
                ))}
              </ul>
            </div>
          );
        };
        
        

        setBooks(res.data.books);
      } catch (err) {
        console.error('Error fetching books:', err);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div>
      <h2>Books</h2>
      <ul>
        {books.map(book => {
       return (   <li key={book._id}>
            <h3>{book.title}</h3>
            <p>Author: {book.author}</p>
            <p>Genre: {book.genre}</p>
            <p>Description: {book.description}</p>
            <img src={book.cover} alt={book.title} />
            <p>File Path: {book.filePath}</p>
          </li>)
})}
      </ul>
    </div>
  );
};

export default BooksList;
