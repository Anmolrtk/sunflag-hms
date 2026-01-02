import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { PrismaService } from '../prisma/prisma.service';

@Controller('appointments')
export class AppointmentsController {
  constructor(
    private readonly appointmentsService: AppointmentsService,
    private readonly prisma: PrismaService
  ) {}

  // --- IMPORTANT: Put this ABOVE other @Get methods ---
  @Get('doctors')
  async getDoctors() {
    console.log("API: Fetching Doctors List..."); // Log to confirm it hits here
    return this.prisma.doctor.findMany();
  }
  // ----------------------------------------------------

  @Post()
  create(@Body() createAppointmentDto: any) {
    return this.appointmentsService.create(createAppointmentDto);
  }

  @Get()
  findAll() {
    return this.appointmentsService.findAll();
  }
}
