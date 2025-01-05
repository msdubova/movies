import axios from 'axios';
import { Client } from 'pg';

require('dotenv').config();

const dbConfig = {
  host: process.env.DB_HOST as string,
  port: parseInt(process.env.DB_PORT || '', 10) as number,
  user: process.env.DB_USER_NAME as string,
  password: process.env.DB_PASSWORD as string,
  database: process.env.DB_DATABASE as string,
};

export const client = new Client(dbConfig); // Export the client object

// Function to connect to the database
export async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to PostgreSQL database');
  } catch (error) {
    console.error('Error connecting to PostgreSQL database:', error);
  }
}

// Function to close the database connection
export async function disconnectFromDatabase() {
  try {
    await client.end();
    console.log('Disconnected from PostgreSQL database');
  } catch (error) {
    console.error('Error disconnecting from PostgreSQL database:', error);
  }
}

export async function fetchDataAndPopulateDatabase() {
  try {
    // Connect to the database
    await connectToDatabase();

    // Fetch data from an external API (e.g., TMDb)
    const response = await axios.get(
      'https://api.themoviedb.org/3/trending/all/day',
      {
        params: {
          api_key: '905f3f9624e460d90f12e0e8b7e07f56',
        },
      }
    );

    const mediaData = response.data.results;

    // Insert data into the database
    for (const media of mediaData) {
      await client.query(
        'INSERT INTO media (title, media_type, release_date, poster_path, vote_average) VALUES ($1, $2, $3, $4, $5)',
        [
          media.title || media.name, // Use 'title' for movies and 'name' for TV shows
          media.media_type,
          media.first_air_date || media.release_date, // Use 'first_air_date' for TV shows and 'release_date' for movies
          media.poster_path,
          media.vote_average,
        ]
      );
    }

    console.log('Data has been populated into the database');
  } catch (error) {
    console.error('Error fetching and populating data:', error);
  } finally {
    // Disconnect from the database
    await disconnectFromDatabase();
  }
}

// Run the script
// This line should be removed when running tests to prevent automatic execution
// if (process.env.NODE_ENV !== 'test') {
//   fetchDataAndPopulateDatabase();
// }
