const axios = require('axios');

const port = 3002;
const baseUrl = `http://localhost:${port}`;
const title = "JavaScript: The Good Parts";

async function getBooksByTitle(title) {
    try {
        const response = await axios.get(`${baseUrl}/books/title/${title}`);
        console.log("Books by title:", response.data);
    } catch (error) {
        console.error("Error:", error.response ? error.response.data : error.message);
    }
}

getBooksByTitle(title);
