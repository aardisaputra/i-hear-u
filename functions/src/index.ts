import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as express from "express";
import * as bodyParser from "body-parser";
const cors = require("cors");
const apiRoute = require("./api");

admin.initializeApp(functions.config().firebase);

var app = express();
app.use(cors({ origin: true }));
app.use(apiRoute);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

exports.auth = functions.https.onRequest(app);
