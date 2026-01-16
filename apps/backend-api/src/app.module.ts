import 'dotenv/config'; // Keep this at the top!
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';

// Auth & Users
import { AuthModule } from './auth/auth.module';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';

// Appointments
import { AppointmentsController } from './appointments/appointments.controller';
import { PublicAppointmentsController } from './appointments/public-appointments.controller'; // <--- THIS WAS MISSING
import { AppointmentsService } from './appointments/appointments.service';
import { NotificationsService } from './appointments/notifications.service';

@Module({
  imports: [AuthModule],
  controllers: [
    AppController,
    UsersController,
    AppointmentsController,
    PublicAppointmentsController // <--- Ensure it's here
  ],
  providers: [
    AppService,
    PrismaService,
    UsersService,
    AppointmentsService,
    NotificationsService
  ],
})
export class AppModule {}
