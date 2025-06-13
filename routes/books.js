const express = require('express');
const books = require('../data/books');
const jwt = require('jsonwebtoken');

const router = express.Router();

const authenticateUser = (req, res, next) => {
  if (req.session.authorization) {
    let token = req.session.authorization['accessToken'];
    jwt.verify(token, "access", (err, user) => {
      if (!err) {
        req.user = user;
        next();
      } else {
        return res.status(403).json({ message: "User not authenticated" });
      }
    });
  } else {
    return res.status(401).json({ message: "User not logged in" });
  }
};

router.get('/', (req, res) => {
  res.json(books);
});

router.get('/isbn/:isbn', (req, res) => {
  const book = books.find(b => b.isbn === req.params.isbn);
  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

router.get('/author/:author', (req, res) => {
  const author = req.params.author.toLowerCase();
  const results = books.filter(b => b.author.toLowerCase().includes(author));
  res.json(results);
});

router.get('/title/:title', (req, res) => {
  const title = req.params.title.toLowerCase();
  const results = books.filter(b => b.title.toLowerCase().includes(title));
  res.json(results);
});

router.get('/:isbn/reviews', (req, res) => {
  const book = books.find(b => b.isbn === req.params.isbn);
  if (book) {
    res.json(book.reviews);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

router.post('/:isbn/reviews', authenticateUser, (req, res) => {
  const review = req.body.review;
  const book = books.find(b => b.isbn === req.params.isbn);

  if (!review) return res.status(400).json({ message: "Review content missing" });
  if (!book) return res.status(404).json({ message: "Book not found" });

  const reviewer = `${req.user.firstName} ${req.user.lastName} (${req.user.username})`;
  book.reviews[reviewer] = review;
  res.status(200).json({ message: "Review added/updated", reviews: book.reviews });
});

router.delete('/:isbn/reviews', authenticateUser, (req, res) => {
  const book = books.find(b => b.isbn === req.params.isbn);
  if (!book) return res.status(404).json({ message: "Book not found" });

  const reviewer = `${req.user.firstName} ${req.user.lastName} (${req.user.username})`;
  if (book.reviews[reviewer]) {
    delete book.reviews[reviewer];
    res.json({ message: "Review deleted", reviews: book.reviews });
  } else {
    res.status(404).json({ message: "Review not found" });
  }
});

module.exports = router;