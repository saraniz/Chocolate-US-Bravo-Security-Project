import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/userModel.js';

let tokenBlacklist = [];

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};


//Registering User
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
  
    try {
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
      });
  
      const savedUser = await newUser.save();
  
      if (savedUser) {
        const token = generateToken(savedUser._id);
        
        res.setHeader('Authorization', `Bearer ${token}`);
  
        return res.status(201).json({
          message: 'Registration successful'
        });
      } else {
        return res.status(400).json({ message: 'Failed to save user data' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
};
  
  
//Login an existing User
const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
     
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
      const token = generateToken(user._id);
      res.setHeader('Authorization', `Bearer ${token}`);

      return res.json({
        message: 'Login successful'
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
};
  


//Logging out an logged in User
const logoutUser = (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Add token to blacklist
    tokenBlacklist.push(token);

    res.json({ message: 'Logout successful. Token is invalidated.' });
  } catch (error) {
    console.error('Token verification failed:', error);
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

export { loginUser, registerUser, logoutUser };
