import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService], // Provide PrismaService
  exports: [PrismaService],   // Export PrismaService for other modules
})
export class PrismaModule {}
