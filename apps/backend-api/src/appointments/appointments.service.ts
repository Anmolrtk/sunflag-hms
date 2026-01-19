import 'dotenv/config';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationsService } from './notifications.service';
import { Twilio } from 'twilio';

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

    // --- UPDATE STATUS & SEND WHATSAPP ---
      async updateStatus(id: string, status: string) {
        // 1. Update the Database first
        const appointment = await this.prisma.appointment.update({
          where: { id },
          data: { status },
          include: { patient: true, doctor: true } // We need names for the message
        });

        // 2. If Confirmed, Send WhatsApp
        if (status === 'CONFIRMED') {
          await this.sendWhatsApp(appointment);
        }

        return appointment;
      }

    // Helper Function: Send WhatsApp via Twilio
      async sendWhatsApp(appointment: any) {
          const accountSid = process.env.TWILIO_SID_FINAL;
        const authToken = process.env.TWILIO_AUTH_TOKEN;

        // 👇 DEBUGGING BLOCK START
        console.log("--- TWILIO DEBUGGER ---");
        console.log("Looking for SID:", accountSid ? "✅ Found it!" : "❌ MISSING (Undefined)");
        console.log("Looking for Token:", authToken ? "✅ Found it!" : "❌ MISSING (Undefined)");
        console.log("-----------------------");
        // 👆 DEBUGGING BLOCK END

        // If missing, stop here to prevent crash
        if (!accountSid || !authToken) {
          console.error("⛔ ERROR: Twilio Keys are missing from Environment Variables!");
          return;
        }

        try {
          const client = new Twilio(accountSid, authToken); // This line fails if SID is missing

          const message = await client.messages.create({
            body: `✅ Appointment Confirmed!\n\nDear ${appointment.patientName},\nYour appointment with Dr. ${appointment.doctor.fullName} is confirmed for ${new Date(appointment.date).toLocaleString()}.\n\n- Sunflag Global Hospital`,
            from: 'whatsapp:+14155238886',
            to: `whatsapp:+91${appointment.patientPhone}` // Ensure +91 is here
          });
          console.log('WhatsApp sent successfully:', message.sid);
        } catch (error) {
          console.error('Failed to send WhatsApp:', error.message);
        }
      }
  
  async remove(id: string) {
    return this.prisma.appointment.delete({ where: { id } });
  }
}
