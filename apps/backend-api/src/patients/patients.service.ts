import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PatientsService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    // 1. Log incoming data for debugging
    console.log("--------------------------------");
    console.log("INCOMING PATIENT DATA:", data);

    try {
      // 2. Generate UHID (Unique Hospital ID)
      const uhid = `HMS-${Date.now().toString().slice(-6)}`;

      // 3. Fix Date Format
      if (!data.dateOfBirth) {
        throw new Error("Date of Birth is missing!");
      }
      const dobDate = new Date(data.dateOfBirth);

      // 4. Create Patient in DB (Using correct field names)
      const newPatient = await this.prisma.patient.create({
        data: {
          name: data.fullName,       // Map 'fullName' -> 'name'
          phone: data.mobile || "",  // Map 'mobile' -> 'phone'
          gender: data.gender,
          dob: dobDate,              // Map 'dateOfBirth' -> 'dob'
          email: data.email || null, // Optional email
          
          // Combine address parts because we removed specific columns for city/state
          address: `${data.address || ''} ${data.city || ''} ${data.state || ''}`.trim(),
          
          uhid: uhid,
          // Removed: aadhaarNumber (Field doesn't exist in new schema)
        },
      });
      
      console.log("SUCCESS: Patient Created:", newPatient.id);
      return newPatient;

    } catch (error) {
      console.error("DATABASE ERROR:", error);
      throw error;
    }
  }

  async findAll() {
    return this.prisma.patient.findMany({
      orderBy: { createdAt: 'desc' },
      include: { appointments: true } // Bonus: Include their appointments
    });
  }
}
