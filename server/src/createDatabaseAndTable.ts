import { Client } from 'pg';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST as string, // Ensure these are of type 'string'
  port: parseInt(process.env.DB_PORT || '', 10) as number, // Parse port as a number
  user: process.env.DB_USER_NAME as string,
  password: process.env.DB_PASSWORD as string,
  database: process.env.DB_DATABASE as string,
};

const client = new Client(dbConfig);

// Function to connect to the database
async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to PostgreSQL database');
  } catch (error) {
    console.error('Error connecting to PostgreSQL database:', error);
  }
}

// Function to close the database connection
async function disconnectFromDatabase() {
  try {
    await client.end();
    console.log('Disconnected from PostgreSQL database');
  } catch (error) {
    console.error('Error disconnecting from PostgreSQL database:', error);
  }
}

// Function to create a new database
export async function createDatabase() {
  try {
    // Connect to the default database
    await connectToDatabase();

    // Replace 'tr_movies_db' with your desired database name
    const dbName = "tr_movies_db";
    const createDbQuery = `CREATE DATABASE ${dbName}`;

    // Create the database
    await client.query(createDbQuery);

    // Disconnect from the default database
    await disconnectFromDatabase();

    // Switch to the newly created database
    const newClient = new Client({ ...dbConfig, database: dbName });
    await newClient.connect();

    // Create the 'media' table if it doesn't exist
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS media (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255),
        media_type VARCHAR(255),
        release_date DATE,
        poster_path VARCHAR(255),
        vote_average FLOAT
      )
    `;
    await newClient.query(createTableQuery);

    console.log(`Database '${dbName}' and table 'media' created successfully`);
  } catch (error) {
    console.error("Error creating database and table:", error);
  } 
}
// Run the script to create the database and table
createDatabase();
