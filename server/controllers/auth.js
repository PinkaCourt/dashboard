const jwt = require("jsonwebtoken");
const secret = require("../app.config").secret;

module.exports = {
  verifyToken(req, res, next) {
    let token = req.headers["x-access-token"];

    if (!token) res.status(403).send({ message: "No token provided" });

    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res
          .status(500)
          .send({ auth: false, message: "Failed to authenticate" });
      }

      req.userId = decoded.id;
      next();
    });
  },
};
