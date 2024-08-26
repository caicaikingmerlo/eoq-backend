-- CreateTable
CREATE TABLE "OCRResult" (
    "id" SERIAL NOT NULL,
    "imagePath" TEXT NOT NULL,
    "extractedText" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OCRResult_pkey" PRIMARY KEY ("id")
);
