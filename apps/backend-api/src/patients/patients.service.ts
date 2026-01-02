import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PatientsService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    // 1. Log the incoming data to the terminal
    console.log("--------------------------------");
    console.log("INCOMING PATIENT DATA:", data);

    try {
      // 2. Generate UHID
      const uhid = `HMS-${Date.now().toString().slice(-6)}`;

      // 3. Fix Date Format
      // If dateOfBirth is missing, this will throw an error
      if (!data.dateOfBirth) {
        throw new Error("Date of Birth is missing!");
      }
      const dob = new Date(data.dateOfBirth);

      // 4. Create Patient in DB
      const newPatient = await this.prisma.patient.create({
        data: {
          fullName: data.fullName,
          mobile: data.mobile,
          gender: data.gender,
          dateOfBirth: dob,
          address: data.address,
          city: data.city,
          state: data.state,
          aadhaarNumber: data.aadhaarNumber || null,
          uhid: uhid,
        },
      });
      
      console.log("SUCCESS: Patient Created:", newPatient.id);
      return newPatient;

    } catch (error) {
      // 5. Log the specific error if it fails
      console.error("DATABASE ERROR:", error);
      throw error; // Pass it back to the controller
    }
  }

  async findAll() {
    return this.prisma.patient.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }
}
