import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';

@Controller('appointments/public')
export class PublicAppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  async create(@Body() body: any) {
    console.log("📥 RECEIVED PUBLIC BOOKING:", body); // Log input
    try {
      const result = await this.appointmentsService.createGuestAppointment(body);
      console.log("✅ BOOKING SAVED:", result.id);
      return result;
    } catch (error) {
      console.error("❌ BOOKING FAILED:", error.message); // Log exact error
      throw new HttpException(
        `Booking Failed: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
