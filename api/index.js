const app = require('../app');  // Import the express app

module.exports = (req, res) => {
  app(req, res);  // Invoke the Express app to handle the request
};
