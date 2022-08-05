import * as bcrypt from 'bcryptjs';
import HttpException from '../shared/HttpException';
import IToken from '../interfaces/tokenInterface';
import IUser from '../interfaces/userInterface';
import Users from '../database/models/User';
import jwt from '../utils/jwt';

const loginUser = async (user: Omit<IUser, 'role, username'>): Promise<IToken> => {
  if (!user.email || !user.password) throw new HttpException(400, 'All fields must be filled');
  const { email, password } = user;

  const userLogin = await Users.findOne({ where: { email } });

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

/* const roleUserService = async (token: IUser): Promise<object> => {
  console.log('recebendo o token', token);
  const { role } = token;
  console.log('service', token);
  return { role };
}; */

export default {
  loginUser,
  // roleUserService,
};
