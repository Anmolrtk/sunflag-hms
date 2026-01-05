import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // 1. Find a user by Email (Used for Login)
  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  // 2. Find a user by Email (Alternative name often used)
  async findOne(email: string) {
    return this.findByEmail(email);
  }

  // 3. Create a New User (General)
  async create(data: any) {
    return this.createUser(data);
  }

  // 4. Create User with Password Hashing (The Real Logic)
  async createUser(data: any) {
    // If password exists, hash it. If not, use a default (for testing only)
    const rawPassword = data.password || "password123";
    const hashedPassword = await bcrypt.hash(rawPassword, 10);
    
    return this.prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        fullName: data.name || data.fullName, // Handle both naming conventions
        phone: data.phone,
        role: data.role || 'PATIENT',
        
        // Optional: Create Doctor Profile if role is DOCTOR
        doctorProfile: data.role === 'DOCTOR' ? {
          create: {
            specialization: data.specialization || "General",
            licenseNumber: "TBD",
            department: "General",
            consultationFee: 500
          }
        } : undefined
      },
    });
  }

  // 5. Get All Users
  async findAll() {
    return this.prisma.user.findMany();
  }

  // 6. Get All Doctors (For the Dropdown/List)
  async findAllDoctors() {
    return this.prisma.user.findMany({
      where: { role: 'DOCTOR' },
      include: { doctorProfile: true }
    });
  }
}
