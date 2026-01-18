import { Controller, Get, Post, Patch, Body, UseGuards, Delete, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // --- THIS MUST BE FIRST ---
  @Get('public/doctors')
  async getPublicDoctors() {
      console.log("✅ Public Doctors route was hit!");
      return this.usersService.findAllDoctors();
  }

    // -----------------------------------------------------
    // 2. PROTECTED ROUTES (Below Public)
    // -----------------------------------------------------

    // Get List of Doctors (For Dashboard)
    @UseGuards(JwtAuthGuard)
    @Get('doctors')
    async getDoctors() {
        return this.usersService.findAllDoctors();
    }
    
    // Add a New User/Staff
    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() body: any) {
        return this.usersService.createUser(body);
    }

    // Get ALL Users
    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll() {
        return this.usersService.findAll();
    }

    // Delete User
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.usersService.remove(id);
    }
    
    // Update User
    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async update(@Param('id') id: string, @Body() body: any) {
        return this.usersService.update(id, body);
    }
}
