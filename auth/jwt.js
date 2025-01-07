import jwt from "jsonwebtoken";

export const jwtAuthMiddleware = (req, res, next) => {
  // First check request header has authorization or not
  const authorization = req.headers.authorization;

  if (!authorization)
    return res.status(401).json({ error: "Token not found::" });

  // Extract the JWT Token from request header
  const token = req.headers.authorization.replace("Bearer ", "");

  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    // Verify the JWT Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user information to the request object
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Invalid Token::" });
  }
};

export const generateToken = (userData) => {
  // Generate a new JWT Token using user data
  return jwt.sign(userData, process.env.JWT_SECRET, {
    expiresIn: 30000,
  });
};
