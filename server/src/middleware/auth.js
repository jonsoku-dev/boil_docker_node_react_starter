const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
  //Get token from header
  const token = req.header("x-auth-token");

  //Check if not token
  if (!token) {
    return res.status(401).json({ msg: "토큰이 존재하지 않습니다." });
  }

  //Verify token
  try {
    const decoded = jwt.verify(token, "jong");
    console.log(decoded, "middleware/auth.js");
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
