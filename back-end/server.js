import app from './app.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

/* Ensure environment variables are correctly loaded */
const { DB_CREDENTIALS, DB_HOST, DB_NAME } = process.env;

if (!DB_CREDENTIALS || !DB_HOST || !DB_NAME) {
    console.error("Missing necessary environment variables for MongoDB connection");
    process.exit(1);
}

/* MongoDB credentials */
const dbUri = 'mongodb+srv://'+process.env.DB_CREDENTIALS+'@'+process.env.DB_HOST+'/'+process.env.DB_NAME+'?retryWrites=true&w=majority';
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

const PORT =  process.env.PORT || 3000;

/* Run server */
const server = app.listen(PORT, () => {
    console.log(`Server running on port: http://localhost:${PORT}\nWait for database connection...`);
});

/* Database connection */
mongoose.connect(dbUri, clientOptions)
.then(() => {
    console.log('Connected to mongoDB successfully!');
})
.catch(err => {
    console.error("Could not connect to mongoDB!", err);
    server.close();
    process.exit(1);
});

export default server;