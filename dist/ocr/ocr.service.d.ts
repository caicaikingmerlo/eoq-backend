import { PrismaService } from '../prisma/prisma.service';
type File = Express.Multer.File;
export declare class OcrService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    processImage(file: File): Promise<void>;
}
export {};
