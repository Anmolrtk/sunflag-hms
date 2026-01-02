import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PrescriptionsService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    console.log("Saving Prescription:", data);

    return this.prisma.prescription.create({
      data: {
        appointmentId: data.appointmentId,
        diagnosis: data.diagnosis,
        notes: data.notes,
        medicines: {
          create: data.medicines.map((med) => ({
            medicineName: med.name,
            dosage: med.dosage,
            duration: med.duration,
            instruction: med.instruction
          }))
        }
      },
      include: { medicines: true }
    });
  }

    async findAll() {
        return this.prisma.prescription.findMany({
          include: {
            medicines: true,
            appointment: {
              include: { patient: true } // <--- NOW we get the Patient details too
            }
          },
          orderBy: { createdAt: 'desc' }
        });
      }
      
      async findOne(id: string) {
        return this.prisma.prescription.findUnique({
          where: { id },
          include: {
            medicines: true,
            appointment: {
              include: { patient: true, doctor: true } // Get Doctor details too for the letterhead
            }
          }
        });
      }
}
