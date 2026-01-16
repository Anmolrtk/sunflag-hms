import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';
import * as bcrypt from 'bcrypt';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS
  app.enableCors();

  // Create Default Admin if not exists
  const prisma = app.get(PrismaService);
  const admin = await prisma.user.findFirst({
    where: { role: 'ADMIN' } // <--- FIX: Use String 'ADMIN'
  });

  if (!admin) {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await prisma.user.create({
      data: {
        email: 'admin@sunflag.com',
        password: hashedPassword,
        fullName: 'Super Admin',
        role: 'ADMIN', // <--- FIX: Use String 'ADMIN'
      },
    });
    console.log('Admin account created: admin@sunflag.com / admin123');
  }

  await app.listen(3001);
}
bootstrap();
