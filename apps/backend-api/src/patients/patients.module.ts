import { Module } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module'; // <--- Import this

@Module({
  imports: [
    PrismaModule,
    AuthModule // <--- Add this here to fix the error
  ],
  controllers: [PatientsController],
  providers: [PatientsService],
})
export class PatientsModule {}
