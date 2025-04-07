// Middleware to verify token
const authenticate = (req, res, next) => {
    const token = req.headers['authorization'].split(" ")[1]; // Expecting token in Authorization header
  
    if (!token) {
      return res.status(401).json({ message: 'Access Denied. No Token Provided.' });
    }
  
    try {
      const verified = jwt.verify(token, 'your-secret-key'); // Use the same secret key as during token generation
      req.user = verified; // Add the verified user information to the request object
      next(); // Pass control to the next middleware or route handler
    } catch (err) {
      res.status(400).json({ message: 'Invalid Token' });
    }
  };
  

module.exports = {authenticate}