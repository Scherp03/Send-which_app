import jwt from 'jsonwebtoken';

export const tokenChecker = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  // Check if there is an Authorization header
  if (!authHeader) {
    return res.status(400).json({ message: 'Not authenticated' });
  }
  // Verify token's validity
  const token = authHeader && authHeader.split(' ')[1];
  if (!token)
    return res
      .status(401)
      .json({ success: false, message: 'No token provided' });
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
    if (err) return res.sendStatus(403);
    req.decodedToken = decodedToken;
    next();
  });
};