const connection = require('./db');

// Insert data into the 'users' table
const insertUserQuery = `
  INSERT INTO users (name, email, password) 
  VALUES ('John Doe', 'johndoe@example.com', 'password123');
`;

connection.query(insertUserQuery, (err, results) => {
  if (err) {
    console.error('Error inserting data: ', err);
  } else {
    console.log('Data inserted successfully', results);
  }
  // Close the connection
  connection.end();
});
