const connection = require('./db');

// Create a table named 'users'
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(100),
    password VARCHAR(100)
  );
`;

connection.query(createTableQuery, (err, results) => {
  if (err) {
    console.error('Error creating table: ', err);
  } else {
    console.log('Table created successfully', results);
  }
  // Close the connection
  connection.end();
});
