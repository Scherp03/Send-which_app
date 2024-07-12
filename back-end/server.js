import app from './app.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import initDb from './database/initDb.js';

dotenv.config();

/* Ensure environment variables are correctly loaded */
const { DB_CREDENTIALS, DB_HOST, DB_NAME } = process.env;

if (!DB_CREDENTIALS || !DB_HOST || !DB_NAME) {
  console.error(
    'Missing necessary environment variables for MongoDB connection',
  );
  process.exit(1);
}

/* MongoDB credentials */
const dbUri =
  'mongodb+srv://' +
  process.env.DB_CREDENTIALS +
  '@' +
  process.env.DB_HOST +
  '/' +
  process.env.DB_NAME +
  '?retryWrites=true&w=majority';
const clientOptions = {
  serverApi: { version: '1', strict: true, deprecationErrors: true },
};

const PORT = process.env.PORT || 3000;

/* Run server */
app.listen(PORT, async () => {
  console.log('Wait for database connection...');
  try {
    /* Database connection */
    const db = await mongoose.connect(dbUri, clientOptions);
    console.log('Connected to mongoDB successfully!');

    if (process.argv.includes('--init-db')) {
      // function that populates db
      await initDb();
    }
    console.log(`Server running on port: http://localhost:${PORT}`);
    console.log(`Read API documentation: http://localhost:${PORT}/api-docs`);
  } catch (err) {
    console.error('Could not connect to mongoDB!', err);
    process.exit(1);
  }
});
