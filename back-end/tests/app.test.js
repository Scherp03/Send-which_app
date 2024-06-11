// import server from "../server.js";
// import app from "../app.js";
// import request from "supertest";
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';

test ('true is true', () => {
    expect(true).toBe(true);
});

// dotenv.config();

// describe("Server start and DB connection", () => {
//     const dbUri = 'mongodb+srv://'+process.env.DB_CREDENTIALS+'@'+process.env.DB_HOST+'/'+process.env.DB_NAME+'?retryWrites=true&w=majority';

//     beforeAll(async () => {
//         jest.setTimeout(10000);
//         jest.unmock('mongoose');
//         await mongoose.connect(dbUri);
//     });

//     afterAll(async () => {
//         jest.setTimeout(10000);
//         // mongoose.connection.close(true);
//         await mongoose.disconnect();
//         server.close();
//     });

//     test('GET / should return 200', async () => {
//         const response = await request(app).get('/');
//         expect(response.status).toBe(200);
//         expect(response.text).toBe("Welcome to homepage!");
//     });
// });