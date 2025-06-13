const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const users = require('../data/users');

const router = express.Router();

const doesExist = (username) => {
  return users.some(user => user.username === username);
};

const isEmailUsed = (email) => {
  return users.some(user => user.email === email);
};

const authenticatedUser = (username, password) => {
  return users.find(user => user.username === username && user.password === password);
};

router.post('/register', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;

  if (username && password && firstName && lastName && email) {
    if (!doesExist(username) && !isEmailUsed(email)) {
      users.push({ username, password, firstName, lastName, email });
      return res.status(201).json({ message: "User registered successfully" });
    } else {
      return res.status(400).json({ message: "Username or email already taken" });
    }
  }
  return res.status(400).json({ message: "All API register user fields are required" });
});

router.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(400).json({ message: "Missing credentials" });
  }

  const user = authenticatedUser(username, password);
  if (user) {
    const accessToken = jwt.sign(
      { username: user.username, firstName: user.firstName, lastName: user.lastName },
      'access',
      { expiresIn: '1h' }
    );
    req.session.authorization = { accessToken, username: user.username };
    return res.status(200).json({ message: "Login successful" });
  } else {
    return res.status(401).json({ message: "Invalid credentials" });
  }
});

module.exports = router;