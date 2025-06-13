const axios = require('axios');
const port = 3002;
const isbn = '9780596517748';
const url = `http://localhost:${port}/books/isbn/${isbn}`;

// Custom promise wrapper
let fetchBookByISBN = new Promise((resolve, reject) => {
    axios.get(url)
        .then(response => resolve(response.data))
        .catch(error => reject(error.message));
});

fetchBookByISBN
    .then(data => {
        console.log("Book data:", data);
    })
    .catch(err => {
        console.error("Error:", err);
    });
