import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getStats() {
    // 1. Count Patients (Users with role PATIENT)
    const totalPatients = await this.prisma.user.count({
      where: { role: 'PATIENT' }
    });

    // 2. Count Appointments
    const today = new Date();
    today.setHours(0,0,0,0);
    
    const appointmentsToday = await this.prisma.appointment.count({
      where: {
        date: { gte: today }
      }
    });

    // 3. Revenue Stats (Fix: Use 'amount', not 'totalAmount')
    const revenue = await this.prisma.invoice.aggregate({
      _sum: { amount: true },
      where: { status: 'PAID' }
    });

    const pending = await this.prisma.invoice.aggregate({
      _sum: { amount: true },
      where: { status: 'PENDING' }
    });

    return {
      totalPatients,
      appointmentsToday,
      totalRevenue: revenue._sum.amount || 0,
      pendingRevenue: pending._sum.amount || 0
    };
  }
}
