import { Controller, Post, Body } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';

// Note: We do NOT add @UseGuards(JwtAuthGuard) here. This is public.
@Controller('public/appointments')
export class PublicAppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  async create(@Body() body: any) {
    return this.appointmentsService.createGuestAppointment(body);
  }
}
