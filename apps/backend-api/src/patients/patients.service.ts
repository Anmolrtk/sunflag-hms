import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PatientsService {
  constructor(private prisma: PrismaService) {}

  // 1. Create Patient (Used by Appointment logic)
  async create(data: any) {
    return this.prisma.patient.create({ data });
  }

  // 2. Get All Patients (with Appointment History)
  async findAll() {
    return this.prisma.patient.findMany({
      include: {
        appointments: {
          orderBy: { date: 'desc' }, // Newest first
          take: 5 // Just get the last 5 to keep it light
        }
      },
      orderBy: {
        createdAt: 'desc' // Newest patients first
      }
    });
  }

  // 3. Find One
  async findOne(id: number) {
    return this.prisma.patient.findUnique({
      where: { id },
      include: { appointments: true }
    });
  }
}
