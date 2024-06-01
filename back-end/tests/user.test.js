import app from '../app.js';
import request from 'supertest';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

describe('POST /users/signup', () => {
    const dbUri =
        'mongodb+srv://' +
        process.env.DB_CREDENTIALS +
        '@' +
        process.env.DB_HOST +
        '/' +
        process.env.DB_NAME +
        '?retryWrites=true&w=majority';

    beforeAll(async () => {
        await mongoose.connect(dbUri);
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    describe('Given all data correctly', () => {
        const user1 = {
            firstName: 'John',
            lastName: 'Doe',
            username: 'johndoe',
            email: 'john.doe@gmail.com',
            password: 'Apple123',
        };

        test('Should respond with a 200 status code', async () => {
            const response = await request(app)
                .post('/user/signup')
                .send(user1);
            expect(response.statusCode).toBe(200);
            expect(response.success).toBe(true);
            expect(response.message).toBe(
                `User \'${body.username}\' created successfully`,
            );
        });
    });
});
