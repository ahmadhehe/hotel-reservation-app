const connection = require('./db');

// Query data from the 'users' table
const query = 'SELECT * FROM users';

connection.query(query, (err, results) => {
  if (err) {
    console.error('Error querying data: ', err);
  } else {
    console.log('Data fetched successfully:', results);
  }
  // Close the connection
  connection.end();
});
