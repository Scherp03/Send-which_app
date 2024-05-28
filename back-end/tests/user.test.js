import request from "supertest";
import app from "../app.js";

const dbUri = 'mongodb+srv://'+process.env.DB_CREDENTIALS+'@'+process.env.DB_HOST+'/'+process.env.DB_NAME+'?retryWrites=true&w=majority';

describe("POST /user/signup", () => {

    describe("Given all data correctly"), () => {

        const user1 = {
            firstName: "John",
            lastName: "Doe",
            username: "johndoe",
            email: "john.doe@gmail.com",
            password: "Apple123"
        } 

        test("Should respond with a 200 status code", async () => {
            const response = await request(app).post("/user/signup").send(user1);
            expect(response.statusCode).toBe(200);
            expect(response.success).toBe(true);
            expect(response.message).toBe(`User \'${body.username}\' created successfully`);
        });
    };
});