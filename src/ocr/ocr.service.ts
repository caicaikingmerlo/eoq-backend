import { Injectable } from '@nestjs/common';
import * as Tesseract from 'tesseract.js';
import { PrismaService } from '../prisma/prisma.service';
import { join } from 'path';
import { promises as fs } from 'fs';
import { Express, Request } from 'express';

type File = Express.Multer.File;

@Injectable()
export class OcrService {
  constructor(private readonly prisma: PrismaService) {}

  async processImage(file: File) {
    const imagePath = join(__dirname, '../../uploads', file.filename);
    await fs.writeFile(imagePath, file.buffer);

    const { data: { text } } = await Tesseract.recognize(imagePath);

    // const ocrResult = await this.prisma.oCRResult.create({
      // data: {
        // imagePath,
        // extractedText: text,
      // },
    // });
  }
}
