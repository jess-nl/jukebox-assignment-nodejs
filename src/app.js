const express = require("express");
const app = express();
const port = 3000;
const axios = require("axios");
require("dotenv/config");

app.listen(port, () => {
  console.log(`Listening at ${port}`);
});
