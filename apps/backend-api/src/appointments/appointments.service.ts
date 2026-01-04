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
    async createGuestAppointment(data: any) {
        const { fullName, email, phone, date, reason } = data;

        // 1. Find or Create the Patient
        let patient = await this.prisma.patient.findFirst({
          where: { phone: phone }
        });

        if (!patient) {
          patient = await this.prisma.patient.create({
            data: {
              name: fullName,
              email: email || "no-email@example.com",
              phone: phone,
              gender: "UNKNOWN", // Default for quick booking
              dob: new Date(),   // Placeholder
              address: "Not Provided"
            }
          });
        }

        // 2. Find a default Doctor (Assign to the first one found for now)
        const doctor = await this.prisma.user.findFirst({
          where: { role: 'DOCTOR' }
        });

        if (!doctor) {
              doctor = await this.prisma.user.findFirst({
                where: { role: 'ADMIN' } // <--- This ensures it works with your account
              });
            }

            if (!doctor) {
              throw new Error("No staff available to take appointment. Please create a user first.");
            }

        // 3. Create the Appointment
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
}
