import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { UserRole } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard) // 1. Check Token, 2. Check Role
  @Roles(UserRole.ADMIN)                   // 3. Must be ADMIN
  findAll() {
    return this.usersService.findAll(); // You need to implement findAll in service
  }
}
