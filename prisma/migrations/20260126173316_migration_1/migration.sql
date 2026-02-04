-- CreateTable
CREATE TABLE "Property" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "lat" TEXT NOT NULL,
    "lng" TEXT NOT NULL,
    "sould" BOOLEAN NOT NULL,
    "imagesUrl" TEXT[],
    "highlights" TEXT[],
    "highLightImage" TEXT NOT NULL,
    "valuePerMeter" DECIMAL(65,30) NOT NULL,
    "dormitoryCount" BIGINT NOT NULL,
    "suitesCount" BIGINT NOT NULL,
    "carSpaces" BIGINT NOT NULL,
    "totalValue" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);
