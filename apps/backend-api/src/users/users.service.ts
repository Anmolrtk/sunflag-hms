import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
    
    async findByEmail(email: string) {
        return this.prisma.user.findUnique({
          where: { email: email },
        });
      }

  // 1. Create a new user (Hashing password)
  async create(createUserDto: CreateUserDto) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    return this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
    });
  }

  // 2. Find a user by Email (Used for Login) <--- THIS WAS MISSING
  async findOne(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  // 3. Find all users (Used for Admin List)
  async findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        createdAt: true,
        // We explicitly exclude 'password' here for security
      },
    });
  }
}
