import { Controller, Post, UseInterceptors, UploadedFile, Req, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PrismaService } from '../prisma/prisma.service';
import * as Tesseract from 'tesseract.js';
import { Response } from 'express';

@Controller('ocr')
export class OcrController {
  constructor(private prisma: PrismaService) {}

  @Post('process')
  @UseInterceptors(FileInterceptor('file'))
  async processImage(@UploadedFile() file: Express.Multer.File, @Req() req, @Res() res: Response) {
    try {
      // Perform OCR on the image
      const { data: { text: ocrData } } = await Tesseract.recognize(file.buffer, 'eng');

      // Get the user ID from the authenticated user (assuming JWT or session)
      const userId = req.user?.id || 1; // Replace with actual auth implementation

      // Save the invoice data in the database
      // const invoice = await this.prisma.invoice.create({
        // data: {
          // userId,
          // imageUrl: file.path, // Save the file path or URL
          // ocrData,
        // },
      // });
      // Return the OCR data to the client
      return res.status(200).json({ ocrData });
    } catch (error) {
      console.error('OCR Processing Error:', error);
      return res.status(500).json({ message: 'Failed to process the image.' });
    }
  }
}
