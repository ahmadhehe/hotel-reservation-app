const connection = require('./db');

// Create a table named 'users'
const createTableQuery = `
  DROP TABLE users;
`;

connection.query(createTableQuery, (err, results) => {
  if (err) {
    console.error('Error dropping table: ', err);
  } else {
    console.log('Table dropped successfully', results);
  }
  // Close the connection
  connection.end();
});
