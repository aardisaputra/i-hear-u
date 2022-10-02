const router = require("express").Router();
var querystring = require("querystring");

const client_id = "b40371e064584491b035f2a03113cc70";
const client_secret = "f4443f764b544c83b469a9b5b1f76cb8";

var request = require("request");
const axios = require("axios");

router.get("/", (req, res) => {
  var scope = "user-read-private user-read-email user-top-read";

  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: "b40371e064584491b035f2a03113cc70",
        scope: scope,
        redirect_uri: "http://localhost:3001/callback",
      })
  );
});

router.get("/callback", function (req, res) {
  // your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null;

  var authOptions = {
    url: "https://accounts.spotify.com/api/token",
    form: {
      code: code,
      redirect_uri: "http://localhost:3001/callback",
      grant_type: "authorization_code",
    },
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(client_id + ":" + client_secret).toString("base64"),
    },
    json: true,
  };

  request.post(authOptions, function (error, response, body) {
    console.log(response.statusCode);
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token,
        refresh_token = body.refresh_token;

      function getProfile() {
        return new Promise(function (resolve, reject) {
          var options = {
            url: "https://api.spotify.com/v1/me",
            headers: { Authorization: "Bearer " + access_token },
            json: true,
          };

          request.get(options, function (error, response, body) {
            console.log(body);
            resolve(response);
          });
        });
      }

      var options = {
        url: "https://api.spotify.com/v1/me/top/tracks",
        headers: { Authorization: "Bearer " + access_token },
        json: true,
      };

      getProfile().then(() => {
        request.get(options, function (error, response, body) {
          console.log(body);
        });
      });

      // we can also pass the token to the browser to make requests from there
      res.redirect(
        "/#" +
          querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token,
          })
      );
    } else {
      res.redirect(
        "/#" +
          querystring.stringify({
            error: "invalid_token",
          })
      );
    }
  });
});

module.exports = router;
