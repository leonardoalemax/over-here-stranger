

import express from "express";
import Merchant from "./Merchant";

const app = express();
app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.listen(8080, function () {
    console.log('Example app listening on port 8080!');
});
  
require('dotenv').config();

const server = new Merchant(process.env.BOT_TOKEN || "");
server.start()

