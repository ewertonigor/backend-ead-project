import { AuthenticationOptions } from "@adminjs/express";
import bcrypt from 'bcrypt';
import { User } from "../models";

export const authenticationOptions: AuthenticationOptions = {
  authenticate: async (email, password) => {
    const user = await User.findOne({ where: { email }})
    if (user && user.role === 'admin') {
      const metched = await bcrypt.compare(password, user.password)

      if (metched) {
        return user
      }
    }

    return false
  },
  cookiePassword: 'senha-de-cookie'
}
