// Import required modules
const fs = require('fs');
const path = require('path');
const Book = require('../models/Book.models');
const { log } = require('console');


class BookController {
  // Function to add a new book
  static async addBook(req, res) {
  
    try {
      const book =new Book(req.body);
      await book.save();
      res.status(201).json({ book });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  }

  // Function to update a book

  static async updateBook(req, res) {
    console.log(req.query,req.params)
    try {
        const bookId = req.params.id; // Extract book ID from request parameters
        const updatedBook = req.body;
        const book = await Book.findByIdAndUpdate(
            bookId,
            {
                title: updatedBook.title,
                author: updatedBook.author,
                genre: updatedBook.genre,
                description: updatedBook.description,
                cover: updatedBook.cover,
                filePath: updatedBook.filePath,
            },
            { new: true }
        );

        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }

        res.status(200).json({ book });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to update book' });
    }
}

  // Function to delete a book
  static async deleteBook(req, res) {
    try {
      const bookId = req.params.id;
      await Book.findByIdAndDelete(bookId);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Function to get a book by id
  static async getBookById(req, res) {
    try {
      const bookId = req.params.id;
      const book = await Book.findById(bookId);
      if (!book) {
        return res.status(404).json({ error: 'Book not found' });
      }
      res.status(200).json({ book });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Function to get all books
  static async getAllBooks(req, res) {
    try {
      const books = await Book.find();
      res.status(200).json({ books });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Function to render a book's PDF
  static async renderBookPdf(req, res) {
    // Implementation for rendering PDF
  }

  // Function to download a book's PDF
  static async downloadBookPdf(req, res) {
    try {
      const bookId = req.params.id;
      const book = await Book.findById(bookId);
      if (!book) {
        return res.status(404).json({ error: 'Book not found' });
      }

      const bookPdfPath = path.join(__dirname, '..', 'public', book.pdfPath);
      res.download(bookPdfPath, book.pdfName);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = BookController;
