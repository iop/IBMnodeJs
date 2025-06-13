const axios = require('axios');

const port = 3002;
const baseUrl = `http://localhost:${port}`;
const author = 'Douglas Crockford';

async function getBooksByAuthor(author) {
    try {
        const response = await axios.get(`${baseUrl}/books/author/${author}`);
        console.log("Books by author:", response.data);
    } catch (error) {
        console.error("Error:", error.response ? error.response.data : error.message);
    }
}

getBooksByAuthor(author);
