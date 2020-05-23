

import express from "express";
import Merchant from "./Merchant";

const app = express();
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(80, () => {
    console.log('Example app listening on port 8080!');
});
  
require('dotenv').config();

const server = new Merchant(process.env.BOT_TOKEN || "");
server.start()

