import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AppointmentsService {
  constructor(private prisma: PrismaService) {}

  // 1. Get All Appointments (Used by Admin Dashboard)
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

  // 2. Create Appointment (Used by Admin when manually booking)
  async create(data: any) {
    let doctorId = data.doctorId;

    // FAILSAFE: If no doctor is selected, find one automatically
    // This prevents the "You must select a Doctor" crash
    if (!doctorId || doctorId === "") {
      console.log("⚠️ No Doctor ID provided. Auto-assigning...");
      
      // Try to find a real Doctor first
      const doc = await this.prisma.user.findFirst({ where: { role: 'DOCTOR' } });
      if (doc) {
        doctorId = doc.id;
      } else {
        // If no Doctor exists, assign to Admin (You)
        const admin = await this.prisma.user.findFirst({ where: { role: 'ADMIN' } });
        if (admin) doctorId = admin.id;
      }
    }

    // If we still can't find anyone, only then throw error
    if (!doctorId) {
      throw new Error("Cannot create appointment: No staff members exist in database.");
    }

    return this.prisma.appointment.create({
      data: {
        date: new Date(data.date),
        reason: data.reason || "Routine Checkup",
        status: 'PENDING',
        
        // FIX: Ensure Patient ID is a Number (Prisma expects Int)
        patientId: Number(data.patientId),
        
        // Use the resolved Doctor ID
        doctorId: doctorId,
      },
    });
  }

  // 3. Create Guest Appointment (Used by Public Website)
  async createGuestAppointment(data: any) {
    const { name, phone, date, reason } = data;

    // A. Find or Create Patient automatically
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
    
    // Fallback: Just grab the first user (panic option)
    if (!doctor) {
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

  // 4. Update Status (Used by Approve/Cancel Buttons)
  async updateStatus(id: number, status: string) {
    return this.prisma.appointment.update({
      where: { id: id },
      data: { status: status },
    });
  }
}
