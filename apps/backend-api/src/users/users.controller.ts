import { Controller, Get, Post, Patch, Body, UseGuards, Delete, Param } from '@nestjs/common';
import { UsersService } from './users.service';
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
    
    // 2. Add a New User/Staff
    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() body: any) {
        return this.usersService.createUser(body);
    }

    // 3. Public Endpoint: Get Doctors for Website
    @Get('public/doctors')
    async getPublicDoctors() {
        return this.usersService.findAllDoctors();
    }

    // 4. Get ALL Users for Dashboard
    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll() {
        return this.usersService.findAll();
    }

    // 5. Delete User (Fixed: ID is passed as a string)
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.usersService.remove(id);
    }
    
    // 6. Update User (Profile Management)
    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async update(@Param('id') id: string, @Body() body: any) {
        return this.usersService.update(id, body);
    }
}
