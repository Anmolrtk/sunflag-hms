import { Controller, Post, Body } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';

@Controller('public/appointments')
export class PublicAppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  async create(@Body() body: any) {
    return this.appointmentsService.createGuestAppointment(body);
  }
}
