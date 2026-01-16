import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  // 1. Create (Registered User)
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() body: any, @Request() req) {
    return this.appointmentsService.create(body, req.user.userId);
  }

  // 2. Get All (Protected & Filtered)
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req) {
    return this.appointmentsService.findAll(req.user);
  }

  // 3. Update Status
  @UseGuards(JwtAuthGuard)
  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.appointmentsService.updateStatus(id, status);
  }
  
  // 4. Delete
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appointmentsService.remove(id);
  }
}
