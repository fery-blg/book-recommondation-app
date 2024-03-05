const express = require("express");
const AdminController = require("../controllers/admin.controller");
const bookController = require('../controllers/book.controllers');
class AdminRouter {
  static #router = express.Router();

  static #initializeRoutes() {
    this.#router.get("/isadmin", AdminController.checkAdmin);
    this.#router.get("/admintest", AdminController.testAdmin);
    this.#router.post("/books/add",(req,res,next)=>{
      console.log("add route");
      next();
    }, bookController.addBook);
    this.#router.put("/books/:id",(req,res,next)=>{
      console.log("update route");
      next();
    }, bookController.updateBook);
    this.#router.delete('/books/:id', bookController.deleteBook);
  }

  static getRouter() {
    this.#initializeRoutes();
    return this.#router;
  }
}

module.exports = AdminRouter.getRouter();
