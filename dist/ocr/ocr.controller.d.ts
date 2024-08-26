import { PrismaService } from '../prisma/prisma.service';
import { Response } from 'express';
export declare class OcrController {
    private prisma;
    constructor(prisma: PrismaService);
    processImage(file: Express.Multer.File, req: any, res: Response): Promise<Response<any, Record<string, any>>>;
}
