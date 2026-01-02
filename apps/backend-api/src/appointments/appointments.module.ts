import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { PrismaModule } from '../prisma/prisma.module'; // <--- Import PrismaModule

@Module({
  imports: [PrismaModule], // <--- Add this so we can use Prisma inside the service/controller
  controllers: [AppointmentsController], // <--- CRITICAL: Controller must be listed here
  providers: [AppointmentsService],
})
export class AppointmentsModule {}
