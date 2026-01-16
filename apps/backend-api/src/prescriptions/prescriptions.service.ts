import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PrescriptionsService {
  constructor(private prisma: PrismaService) {}

  // 1. Create Prescription
  async create(data: any) {
    return this.prisma.prescription.create({
      data: {
        medicines: JSON.stringify(data.medicines), // Store array as String
        notes: data.notes,
        doctorId: data.doctorId,
        appointmentId: data.appointmentId
      }
    });
  }

  // 2. Find All
  async findAll() {
    return this.prisma.prescription.findMany({
      include: {
        appointment: { include: { patient: true } },
        doctor: true
      }
    });
  }

  // 3. Find One
  async findOne(id: string) {
    return this.prisma.prescription.findUnique({
      where: { id },
      include: {
        doctor: true,
        appointment: {
            include: { patient: true }
        }
      }
      // Note: 'medicines' column is fetched automatically. No need to 'include' it.
    });
  }
}
