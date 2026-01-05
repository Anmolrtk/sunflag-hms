import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AppointmentsService {
  constructor(private prisma: PrismaService) {}

  // 1. Get All Appointments (for Admin Dashboard)
  async findAll() {
    return this.prisma.appointment.findMany({
      include: {
        patient: true,
        doctor: true,
      },
      orderBy: {
        date: 'desc',
      },
    });
  }

  // 2. Create Appointment (Admin Internal Use)
  async create(data: any) {
    return this.prisma.appointment.create({
      data: {
        date: new Date(data.date),
        reason: data.reason,
        status: 'PENDING',
        patientId: data.patientId,
        doctorId: data.doctorId,
      },
    });
  }

  // 3. Create Guest Appointment (Public Website)
  async createGuestAppointment(data: any) {
    const { name, phone, date, reason } = data;

    // A. Find or Create Patient
    let patient = await this.prisma.patient.findFirst({
      where: { phone: phone }
    });

    if (!patient) {
      patient = await this.prisma.patient.create({
        data: {
          name: name,
          phone: phone,
          gender: "Unknown",
          dob: new Date(),
          address: "Guest User",
        }
      });
    }

    // B. Find a Staff Member to assign (Doctor or Admin)
    let doctor = await this.prisma.user.findFirst({ where: { role: 'DOCTOR' } });
    
    if (!doctor) {
      doctor = await this.prisma.user.findFirst({ where: { role: 'ADMIN' } });
    }
    
    if (!doctor) {
      // Fallback: Just grab the first user (e.g., the admin we just seeded)
      doctor = await this.prisma.user.findFirst();
    }

    if (!doctor) {
      throw new Error("No staff available to receive appointment.");
    }

    // C. Create the Appointment
    return this.prisma.appointment.create({
      data: {
        date: new Date(date),
        reason: reason,
        status: 'PENDING',
        patientId: patient.id,
        doctorId: doctor.id,
      },
    });
  }

  // 4. Update Status (Approve/Cancel Buttons)
  async updateStatus(id: number, status: string) {
    return this.prisma.appointment.update({
      where: { id: id },
      data: { status: status },
    });
  }
}
