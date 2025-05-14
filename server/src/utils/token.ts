import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

export const generateToken = (email: string): string => {
  return jwt.sign({ email }, SECRET_KEY, { expiresIn: '24h' });
};

export const verifyToken = (token: string): string | null => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY) as { email: string };
    return decoded.email;
  } catch (error) {
    return null;
  }
};
