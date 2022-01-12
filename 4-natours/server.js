const app = require('./app');

//! 4) START THE SERVER
const port = 3000;
app.listen(port, () => {
  //* A callback function that will be called as soon as the server starts listening
  console.log(`App running on portr ${port}...`);
});
