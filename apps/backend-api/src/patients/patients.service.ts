import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PatientsService {
  constructor(private prisma: PrismaService) {}

  // Create Patient (Actually creating a User)
  async create(data: any) {
    return this.prisma.user.create({
      data: {
        email: data.email || `patient-${Date.now()}@hospital.com`, // Fake email if none provided
        password: data.password || "123456", // Default password
        fullName: data.fullName,
        phone: data.phone,
        role: 'PATIENT',
        patientProfile: {
          create: {
            dob: data.dob || "",
            gender: data.gender || "Other",
            bloodGroup: data.bloodGroup || "",
            address: data.address || "",
            medicalHistory: data.medicalHistory || ""
          }
        }
      }
    });
  }

  async findAll() {
    return this.prisma.user.findMany({
      where: { role: 'PATIENT' },
      include: { patientProfile: true }
    });
  }

    async findOne(id: string) {
        return this.prisma.prescription.findUnique({
          where: { id },
          include: {
            doctor: true,
            appointment: {
                include: { patient: true }
            }
          }
          // Removed 'medicines: true' because it is a regular column, not a relation.
        });
      }
}
