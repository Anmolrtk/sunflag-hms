import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { PublicAppointmentsController } from './public-appointments.controller';

@Module({
  imports: [PrismaModule],
  ccontrollers: [AppointmentsController, PublicAppointmentsController],
  providers: [AppointmentsService],
})
export class AppointmentsModule {}
