import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { UserRole } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

    // 1. Get List of Doctors
      @UseGuards(JwtAuthGuard)
      @Get('doctors')
      async getDoctors() {
        return this.usersService.findAllDoctors();
      }

      // 2. Add a New Doctor
      @UseGuards(JwtAuthGuard)
      @Post()
      async create(@Body() body: any) {
        return this.usersService.createUser(body);
      }
    }
