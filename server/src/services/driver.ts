import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { Driver } from '../repositories';

const saltRounds = parseInt(process.env.SALT_ROUNDS || '10');

export default {
  login: async (context, payload) => {
    try {
      const { user } = await context.authenticate('driver-local', payload);
      const token = jwt.sign({
        email: user?.email,
        isDriver: true,
      },
      process.env.JWT_SECRET_KEY || '',
      {
        expiresIn: '5m',
      });
      return { success: true, name: user.name, role: 'driver', token };;
    } catch (e) {
      return { success: false, message: e.message, role: 'driver' };
    }
  },
  signup: async (payload) => {
    const { password } = payload;
    try {
      const hash = await bcrypt.hash(password, saltRounds);
      return await Driver.create({ ...payload, password: hash });
    } catch (e) {
      throw e.message;
    }
  },
  getDriverInfo: async (payload) => {
    try {
      return await Driver.findByEmail(payload);
    } catch (e) {
      throw e.message;
    }
  },
};
