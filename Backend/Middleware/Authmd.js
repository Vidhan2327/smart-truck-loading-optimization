const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const protect = (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) return res.status(401).json({ message: "Not authenticated" });

    const payload = jwt.verify(token, JWT_SECRET);

    req.user = {
      id: payload.userId,
      role: payload.role,
    };

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = { protect };
