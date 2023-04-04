const config = require("../../config/config");
const jwtKey = config.secretKey;
const jwt = require("jsonwebtoken");

exports.getLoggedInUser = function(req, err){
  const token = req.cookies.token;
  return jwt.verify(token, jwtKey);
}
