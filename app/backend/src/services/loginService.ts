import * as bcrypt from 'bcryptjs';
import HttpException from '../shared/HttpException';
import IToken from '../interfaces/tokenInterface';
import { IUser } from '../interfaces/userInterface';
import Users from '../database/models/User';
import jwt from '../utils/jwt';

const loginUser = async (user: Omit<IUser, 'role, username'>): Promise<IToken> => {
  const { email, password } = user;

  const userLogin = await Users.findOne({
    attributes: ['id', 'username', 'role', 'email', 'password'],
    where: { email },
  });

  if (!userLogin) throw new HttpException(401, 'Incorrect email or password');

  const verifyPassword = bcrypt.compareSync(password, userLogin.password);
  if (!verifyPassword) throw new HttpException(401, 'Incorrect email or password');

  const token = jwt.generateJwtToken({
    username: userLogin.username,
    email: userLogin.email,
    role: userLogin.role,
  });

  return { token };
};

export default {
  loginUser,
};
