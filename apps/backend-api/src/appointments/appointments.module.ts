import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { PublicAppointmentsController } from './public-appointments.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [AppointmentsController, PublicAppointmentsController], // Correct spelling!
  providers: [AppointmentsService],
  imports: [PrismaModule],
})
export class AppointmentsModule {}
