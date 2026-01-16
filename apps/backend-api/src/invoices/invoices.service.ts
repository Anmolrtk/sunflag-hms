import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InvoicesService {
  constructor(private prisma: PrismaService) {}

  // 1. Create Invoice
  async create(data: any) {
    return this.prisma.invoice.create({
      data: {
        invoiceNumber: `INV-${Date.now()}`, // Auto-generate ID
        amount: data.amount,
        status: 'PENDING',
        patientId: data.patientId,
        // Create line items linked to this invoice
        items: {
            create: data.items // Expecting array: [{ description, quantity, price }]
        }
      },
      include: {
        items: true
      }
    });
  }

  // 2. Find All Invoices
  async findAll() {
    return this.prisma.invoice.findMany({
      include: {
        patient: true,
        items: true,
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  // 3. Find One Invoice
  async findOne(id: string) {
    return this.prisma.invoice.findUnique({
      where: { id },
      include: {
        patient: true,
        items: true,
        appointment: true
      }
    });
  }
}
