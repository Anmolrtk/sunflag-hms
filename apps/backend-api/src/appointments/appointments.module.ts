import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { PublicAppointmentsController } from './public-appointments.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module'; // <--- 1. Import this

@Module({
  imports: [
    PrismaModule,
    AuthModule // <--- 2. Add this to the imports array
  ],
  controllers: [AppointmentsController, PublicAppointmentsController],
  providers: [AppointmentsService],
})
export class AppointmentsModule {}
