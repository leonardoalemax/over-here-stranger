import 'babel-polyfill';
import express from "express";
import MerchantBot from "./bots/Merchant";

const app = express();
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(process.env.PORT, () => {
    console.log('Example app listening on port 8080!');
});
  
require('dotenv').config();

const server = new MerchantBot();
server.start()
