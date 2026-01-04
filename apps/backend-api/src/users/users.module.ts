import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller'; // If you have one
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController], // It's okay if this is empty or missing
  providers: [UsersService],
  exports: [UsersService], // <--- CRITICAL: This must be here!
})
export class UsersModule {}
