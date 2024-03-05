// Import required modules
const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// Routes for book management
router.post('/books/add', bookController.addBook);
router.put('/books/:id', bookController.updateBook);
router.delete('/books/:id', bookController.deleteBook);
router.get('/books/:id', bookController.getBookById);
router.get('/books', bookController.getAllBooks);

// Routes for reading books
router.get('/books/:id/pdf', bookController.renderBookPdf);

// Routes for downloading books
router.get('/books/:id/pdf/download', bookController.downloadBookPdf);

// Export the router
module.exports = router;