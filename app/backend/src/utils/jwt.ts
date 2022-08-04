import { JwtPayload, sign, SignOptions, verify } from 'jsonwebtoken';
import HttpExceptions from '../shared/HttpException';
import IUser from '../interfaces/userInterface';

const TOKEN_SECRET = process.env.JWT_SECRET || 'jwt_secret';

const jwtConfig: SignOptions = {
  expiresIn: '30m',
  algorithm: 'HS256',
};

const generateJwtToken = (user: Omit<IUser, 'password'>) =>
  sign({ user }, TOKEN_SECRET, jwtConfig);

const authenticateToken = async (token: string | undefined): Promise<string | JwtPayload> => {
  if (!token) {
    throw new HttpExceptions(401, 'jwt malformed');
  }

  try {
    const validate = verify(token, TOKEN_SECRET);
    return validate;
  } catch (error) {
    throw new HttpExceptions(401, 'jwt malformed');
  }
};

export default {
  generateJwtToken,
  authenticateToken,
};
