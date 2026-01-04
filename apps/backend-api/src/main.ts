import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Enable CORS for deployment
    app.enableCors({
        origin: [
          "https://sunflag-hms.vercel.app",      // Your Dashboard
          "https://sunflag-website.vercel.app",  // Your New Website (IMPORTANT!)
          "http://localhost:3000",               // Local testing
          "http://localhost:3001",
          "http://localhost:3005"
        ],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
      });

  // 2. Validate incoming data
  app.useGlobalPipes(new ValidationPipe());

  // --- SEED SCRIPT (Runs once if DB is empty) ---
  const prisma = app.get(PrismaService);
  try {
    const doctorCount = await prisma.doctor.count();
    if (doctorCount === 0) {
      await prisma.doctor.create({
        data: {
          name: "Dr. Sunflag Demo", // Updated name for your client
          specialty: "General Physician",
          consultationFee: 500
        }
      });
      console.log("Seeded initial doctor for Cloud DB");
    }
  } catch (e) {
    console.warn("Skipping seed check (DB might be initializing)");
  }
  // -----------------------------

  // 3. LISTEN ON CLOUD PORT (Critical for Deployment)
  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
