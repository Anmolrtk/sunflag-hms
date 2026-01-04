import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // 1. Where do we get the token from? (The Authorization header: "Bearer <token>")
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      
      // 2. Must match the secret used in AuthModule!
      secretOrKey: "super-secret-key", // In production, use process.env.JWT_SECRET
      
      // 3. Don't allow expired tokens
      ignoreExpiration: false,
    });
  }

  // 4. This runs after the token is verified.
  // It returns the user object that gets attached to Request (req.user)
  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}
