import { Module } from '@nestjs/common';
import { OcrService } from './ocr.service';
import { OcrController } from './ocr.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],  // Import PrismaModule here
  providers: [OcrService],  // Provide OcrService
  controllers: [OcrController],
})
export class OcrModule {}
