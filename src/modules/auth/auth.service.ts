import bcrypt from 'bcryptjs';

import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import axios from 'axios';
import { UsersService } from '../users/services/users.service';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByUsernameWithPassword(username);
    if (!user) {
      return null;
    }
    const match = await bcrypt.compare(pass, user.passwordHash);

    if (user && match) {
      const { passwordHash, ...result } = user;
      return result;
    }
    return null;
  }

  async login(req: any) {
    const { id, ...rest } = req.user;
    const payload = { sub: id, ...rest };

    const { recaptchaToken } = req.query;
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;

    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaToken}`;

    await axios.post(url).then((res) => {
      const { success } = res.data;
      if (!success) {
        throw new ForbiddenException('reCAPTCHA token is not valid');
      }
      return res;
    });

    return {
      access_token: this.jwtService.sign(payload),
      user: req.user,
    };
  }
}
