import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getStats() {
    // 1. Count Total Patients
    const totalPatients = await this.prisma.patient.count();

    // 2. Count Doctors
    const totalDoctors = await this.prisma.user.count({
      where: { role: 'DOCTOR' }
    });

    // 3. Count Appointments (Today)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const appointmentsToday = await this.prisma.appointment.count({
      where: {
        date: {
          gte: today,
          lt: tomorrow
        }
      }
    });

    // 4. Calculate Total Revenue
    const revenue = await this.prisma.invoice.aggregate({
      _sum: { totalAmount: true },
      where: { status: 'PAID' } // Only count actual money received
    });

    // 5. Pending Bills Amount
    const pending = await this.prisma.invoice.aggregate({
      _sum: { totalAmount: true },
      where: { status: 'PENDING' }
    });

    return {
      totalPatients,
      totalDoctors,
      appointmentsToday,
      totalRevenue: revenue._sum.totalAmount || 0,
      pendingRevenue: pending._sum.totalAmount || 0
    };
  }
}
