import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationsService } from './notifications.service';

@Injectable()
export class AppointmentsService {
  constructor(
    private prisma: PrismaService,
    private notifications: NotificationsService
  ) {}

  // 1. Create Guest Appointment (Public Website)
  async createGuestAppointment(data: any) {
    console.log("Attempting to save appointment:", data);

    try {
      const safeName = data.patientName || data.name || data.fullName || "Guest Patient";
      const safePhone = data.patientPhone || data.phone || data.phoneNumber || "No Phone";
      
      const result = await this.prisma.appointment.create({
        data: {
          patientName: safeName,
          patientPhone: safePhone,
          date: new Date(data.date),
          reason: data.reason || "Website Booking",
          doctorId: data.doctorId,
          status: 'PENDING'
        }
      });
      
      console.log("✅ Success! Saved ID:", result.id);
      return result;

    } catch (error) {
      console.error("❌ SAVE FAILED:", error.message);
      throw error;
    }
  }

  // 2. Create Registered Appointment (Dashboard)
  async create(data: any, userId: string) {
    return this.prisma.appointment.create({
      data: {
        patientName: data.patientName,
        patientPhone: data.patientPhone,
        date: new Date(data.date),
        reason: data.reason,
        doctorId: data.doctorId,
        patientId: userId, // Link to registered user
        status: 'PENDING'
      }
    });
  }

  // 3. Find All (With Permissions)
  async findAll(user: any) {
    const whereCondition: any = {};

    // Doctors see only theirs, Patients see only theirs
    if (user.role === 'DOCTOR') {
      whereCondition.doctorId = user.id;
    } else if (user.role === 'PATIENT') {
      whereCondition.patientId = user.id;
    }

    return this.prisma.appointment.findMany({
      where: whereCondition,
      include: {
        doctor: true,
        patient: true
      },
      orderBy: { date: 'asc' }
    });
  }

  // 4. Update Status & Send WhatsApp
  async updateStatus(id: string, status: string) {
    const appointment = await this.prisma.appointment.update({
      where: { id },
      data: { status },
      include: { doctor: true }
    });

    // If Confirmed, Send WhatsApp
    if (status === 'CONFIRMED') {
      await this.notifications.sendWhatsAppConfirmation(
        appointment.patientName,
        appointment.patientPhone,
        appointment.date,
        appointment.doctor?.fullName || "Doctor"
      );
    }

    return appointment;
  }
  
  async remove(id: string) {
    return this.prisma.appointment.delete({ where: { id } });
  }
}
