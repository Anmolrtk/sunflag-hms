import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // 1. Find User by Email
  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email }
    });
  }

  // 2. Find All Users (Includes Profiles)
  async findAll() {
    return this.prisma.user.findMany({
      include: { doctorProfile: true, patientProfile: true }
    });
  }

  // 3. Find All Doctors (Public)
  async findAllDoctors() {
    return this.prisma.user.findMany({
      where: { role: 'DOCTOR' },
      select: {
        id: true,
        fullName: true,
        doctorProfile: {
          select: {
            specialization: true,
            department: true,
            consultationFee: true
          }
        }
      }
    });
  }

  // 4. Create User (Handles Profiles Automatically)
  async createUser(data: any) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return this.prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        fullName: data.fullName,
        phone: data.phone,
        role: data.role || 'PATIENT',
        doctorProfile: data.role === 'DOCTOR' ? {
           create: {
             specialization: data.specialization || 'General',
             department: data.department || 'General',
             consultationFee: data.consultationFee ? Number(data.consultationFee) : 500
           }
        } : undefined
      }
    });
  }

  // 5. Update User (Fixes "Unknown argument department" error)
  async update(id: string, data: any) {
    // Separate User fields from Profile fields
    const { department, specialization, consultationFee, ...userFields } = data;

    // Hash password if it's being updated
    if (userFields.password) {
      userFields.password = await bcrypt.hash(userFields.password, 10);
    }

    return this.prisma.user.update({
      where: { id },
      data: {
        ...userFields, // Update standard fields (name, email, phone)
        
        // Nested Update: Only update profile if role is DOCTOR
        doctorProfile: (department || specialization) ? {
          upsert: {
            create: {
              department: department || 'General',
              specialization: specialization || 'General',
              consultationFee: Number(consultationFee) || 500
            },
            update: {
              department: department,
              specialization: specialization,
              consultationFee: consultationFee ? Number(consultationFee) : undefined
            }
          }
        } : undefined
      }
    });
  }

  // 6. Delete User (Fixes "Foreign key constraint" error)
  async remove(id: string) {
    // Step A: Delete related Appointments first
    await this.prisma.appointment.deleteMany({
      where: { OR: [{ doctorId: id }, { patientId: id }] }
    });

    // Step B: Delete Doctor Profile if exists
    await this.prisma.doctorProfile.deleteMany({
      where: { userId: id }
    });

    // Step C: Delete Patient Profile if exists
    await this.prisma.patientProfile.deleteMany({
      where: { userId: id }
    });

    // Step D: Finally, delete the User
    return this.prisma.user.delete({ where: { id } });
  }
}
