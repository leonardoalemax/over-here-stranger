import 'babel-polyfill';
import express from "express";
import Merchant from "./Merchant";
import IEnv from './models/Env';

const app = express();
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(process.env.PORT, () => {
    console.log('Example app listening on port 8080!');
});
  
require('dotenv').config();

const env:IEnv = {
    isThereAnyDealApiKey: process.env.API_KEY || "",
    telegramToken: process.env.BOT_TOKEN || ""
}

const server = new Merchant(env);
server.start()

