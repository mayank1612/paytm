const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./config");

function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  const token = auth?.replace("Bearer ", "");

  if (!token || !auth) {
    res.status(403).json({ message: "Missing authorization" });
  } else {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.userId = decoded?.userId;
      next();
    } catch (error) {
      res.status(403).json({ messsage: error.message });
    }
  }
}

module.exports = { authMiddleware };
