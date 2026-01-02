import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'HARDCODED_SECRET_KEY_123', // Must match AuthModule
    });
  }

  async validate(payload: any) {
      console.log("JWT VALIDATED! User:", payload.email);
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}

