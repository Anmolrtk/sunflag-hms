import { Module, forwardRef } from '@nestjs/common'; // <--- Import forwardRef
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtStrategy } from './jwt.strategy';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: "super-secret-key",
      signOptions: { expiresIn: '1d' },
    }),
    // FIX: Wrap UsersModule in forwardRef() to handle the circular dependency
    forwardRef(() => UsersModule),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAuthGuard, JwtStrategy],
  exports: [JwtAuthGuard, JwtModule],
})
export class AuthModule {}
