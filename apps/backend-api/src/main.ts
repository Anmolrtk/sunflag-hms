import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';
import { UserRole } from '@prisma/client'; // Import the Role enum

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Get the Prisma Service to talk to the DB
  const prisma = app.get(PrismaService);

  // --- SEEDING LOGIC (Inside the function) ---
  
  // 1. Check if an Admin exists
  const adminCount = await prisma.user.count({
    where: { role: UserRole.ADMIN }
  });

  if (adminCount === 0) {
    console.log('🌱 Seeding initial Admin user...');
    await prisma.user.create({
      data: {
        email: 'admin@sunflag.com',
        password: 'admin', // In production, hash this!
        fullName: 'Super Admin',
        role: UserRole.ADMIN,
      },
    });
    console.log('✅ Admin created!');
  }
  // -------------------------------------------

  // Enable CORS so your Website and Dashboard can connect
  app.enableCors({
    origin: [
      "https://sunflag-hms.vercel.app",
      "https://sunflag-website.vercel.app",
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:3005"
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Start the server
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
