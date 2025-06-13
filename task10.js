const axios = require('axios');

const port = 3002;
const baseUrl = `http://localhost:${port}`;

function getBooks(callback) {
  axios.get(`${baseUrl}/books`)
      .then(response => callback(null, response.data))
      .catch(error => callback(error));
}

getBooks((err, data) => {
  if (err) {
    console.error('Error fetching books:', err.message);
  } else {
    console.log('Books:', data);
  }
});
