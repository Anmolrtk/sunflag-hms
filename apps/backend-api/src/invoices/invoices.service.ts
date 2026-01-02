import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InvoicesService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    console.log("Generating Invoice:", data);
    
    // Generate Invoice Number (INV-XXXXXX)
    const invNum = `INV-${Date.now().toString().slice(-6)}`;

    // Prepare Appointment ID (handle null/undefined)
    const appointmentLink = (data.appointmentId && data.appointmentId !== "undefined")
      ? data.appointmentId
      : null;

    // Calculate Total
    const total = data.items.reduce((sum, item) => sum + (Number(item.amount) * Number(item.quantity)), 0);

    return this.prisma.invoice.create({
      data: {
        invoiceNumber: invNum,
        patientId: data.patientId,
        appointmentId: appointmentLink,
        totalAmount: total,
        status: "PENDING",
        items: {
          create: data.items.map((item) => ({
            description: item.description,
            amount: Number(item.amount),
            quantity: Number(item.quantity) || 1,
          })),
        },
      },
      include: { items: true, patient: true },
    });
  }

  async findAll() {
    return this.prisma.invoice.findMany({
      include: { patient: true, items: true },
      orderBy: { createdAt: 'desc' },
    });
  }
}
