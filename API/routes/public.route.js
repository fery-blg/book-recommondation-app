const express = require('express');
const bookController = require('../controllers/book.controllers');
 
class BookRouter {
    static #router = express.Router();
    static #initializeRoutes() {
        this.#router.get('/bookList', bookController.getAllBooks);
    }
    static getRouter() {
        this.#initializeRoutes();
        return this.#router;
      }
}
module.exports = BookRouter.getRouter();