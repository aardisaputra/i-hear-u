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

  request.post(authOptions, async function (error, response, body) {
    var profile = {};
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token,
        refresh_token = body.refresh_token;

      async function getProfile() {
        var options = {
          url: "https://api.spotify.com/v1/me",
          headers: { Authorization: "Bearer " + access_token },
          json: true,
        };
        await request.get(options, function (error, response, body) {
          profile = body;
          console.log(profile.id);
        });
      }

      async function getSongs() {
        var options = {
          url: "https://api.spotify.com/v1/me/top/tracks",
          headers: { Authorization: "Bearer " + access_token },
          json: true,
        };
        await request.get(options, function (error, response, body) {
          console.log("test2");
          goBack();
        });
      }

      async function goBack() {
        res.redirect(
          "http://localhost:3000/room/BpR8tiltGitkbHgAP4NT?user=" + profile.id
        );
      }

      await getProfile();
      await getSongs();

      // we can also pass the token to the browser to make requests from there
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
