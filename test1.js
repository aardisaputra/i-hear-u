const express = require("express");
const bodyParser = require("body-parser");
const apiRoute = require("./test");

var app = express();
app.use(apiRoute);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(3001, () => {
  console.log(`Example app listening on port 3001`);
});
