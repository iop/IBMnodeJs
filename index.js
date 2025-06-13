const express = require('express');
const session = require('express-session');
const bookRoutes = require('./routes/books');
const userRoutes = require('./routes/users');

const app = express();

app.use(express.json());

app.use(session({
  secret: "fingerpint",
  resave: true,
  saveUninitialized: true
}));

app.use("/books", bookRoutes);
app.use("/users", userRoutes);

const PORT = 3002;
app.listen(PORT, () => console.log("Server is running- port:" + PORT));