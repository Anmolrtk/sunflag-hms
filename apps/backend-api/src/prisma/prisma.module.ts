import { Global, Module } from '@nestjs/common'; // <--- Ensure 'Global' is listed here
import { PrismaService } from './prisma.service';

@Global() // This tells NestJS: "Make this module available everywhere"
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
