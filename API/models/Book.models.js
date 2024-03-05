// models/Book.js
const mongoose = require('mongoose');
const { Schema, model } = mongoose;



class Book {
  static #schema = new mongoose.Schema({
    title: String,
    author: String,
    genre: String,
    description: String,
    cover: String,
    filePath: String,
    authorId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  });

  static getModel() {
    return mongoose.model("Book", this.#schema);
  }
}

module.exports = Book.getModel();

