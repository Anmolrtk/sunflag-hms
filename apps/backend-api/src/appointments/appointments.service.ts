import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AppointmentsService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    // We expect: { patientId, doctorId, date }
    console.log("Booking Appointment:", data);

    return this.prisma.appointment.create({
      data: {
        patientId: data.patientId,
        doctorId: data.doctorId,
        date: new Date(data.date), // Ensure date is valid
        status: "PENDING",
        type: "CONSULTATION"
      },
      include: {
        patient: true, // Return patient details with the response
        doctor: true   // Return doctor details with the response
      }
    });
  }

  async findAll() {
    return this.prisma.appointment.findMany({
      include: {
        patient: true,
        doctor: true
      },
      orderBy: { date: 'desc' }
    });
  }
}
