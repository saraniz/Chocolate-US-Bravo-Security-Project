const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Format: "Bearer <token>"
  
    console.log('Authorization Header:', req.headers.authorization); 
  
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();

    } catch (error) {
      console.error(error);
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
};
  
export default authMiddleware;
  