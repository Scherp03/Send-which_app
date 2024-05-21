import {} from "dotenv/config.js";
import express from "express";
import generateAccessToken from "./services/paypal_serv.js";


/*require('dotenv').config()
const express = require('express')
const paypal=require("./services/paypal_ser")*/

//dotenv.config();

//generateAccessToken();


const app = express();

app.set("view engine","ejs");
app.get("/", (req,res) => {
    res.render("index")
})

process.on('uncaughtException', function (err) {
    console.log("uncaughtException", err);
}); 
app.listen(3000, () => console.log("Server started on port 3000"))