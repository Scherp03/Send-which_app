/*import axios from "axios";

async function generateAccessToken() {
    const response = await axios({
        url: process.env.PAYPAL_BASE_URL + '/v1/oauth2/token',
        method: "post",
        data: "grant_type=client_credentials",
        auth: {
            username: process.env.PAYPAL_CLIENT_ID,
            password: process.env.PAYPAL_SECRET
        }
    })

    console.log(response.data)
}
generateAccessToken();

export default generateAccessToken;*/
import axios from "axios";
import { name } from "ejs";

async function generateAccessToken() {
    try {
        const response = await axios({
            url: process.env.PAYPAL_BASE_URL + "/v1/oauth2/token",
            method: "POST",
            data: "grant_type=client_credentials",
            auth: {
                username: process.env.PAYPAL_CLIENT_ID,
                password: process.env.PAYPAL_SECRET
            }
        });
        //console.log(response.data);
        return response.data.access_token;
    } catch (error) {
        console.error("Si è verificato un errore durante la chiamata Axios:", error);
    }
}

//generateAccessToken();


exports.createOrder = async()=>{
    const accessToken = await generateAccessToken()
    
    const response = await axios({
        url: process.env.PAYPAL_BASE_URL + "/v2/checkout/orders",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorisazion": "Bearer " + accessToken
        },
        data: JSON.stringify({
            intent: "CAPTURE",
            purchase_units: [
                {
                    items: [
                        {
                            name:"Sandwich",
                            description: "test",
                            quantity: 1,
                            unit_amount: {
                                currency_code: "EUR",
                                value: "10.00"
                            }
                        }
                    ]
            }]
        })
    })
}

export default generateAccessToken;
