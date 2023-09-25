-- CreateTable
CREATE TABLE "country" (
    "code" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "country_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "district" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "value" TEXT NOT NULL,

    CONSTRAINT "district_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "region" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "value" TEXT NOT NULL,
    "districtUuid" UUID NOT NULL,

    CONSTRAINT "region_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "city" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "value" TEXT NOT NULL,
    "regionUuid" UUID NOT NULL,

    CONSTRAINT "city_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "company" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "districtUuid" UUID NOT NULL,
    "regionUuid" UUID NOT NULL,
    "cityUuid" UUID NOT NULL,
    "address" TEXT NOT NULL,
    "postalCode" INTEGER NOT NULL,
    "supportPhone" VARCHAR(12) NOT NULL,
    "supportEmail" TEXT NOT NULL,
    "managerPhone" VARCHAR(12) NOT NULL,
    "managerEmail" TEXT NOT NULL,
    "orderPhone" VARCHAR(12) NOT NULL,
    "orderEmail" TEXT NOT NULL,
    "replayToEmail" TEXT NOT NULL,
    "startYear" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "company_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "shop" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "companyUuid" UUID NOT NULL,

    CONSTRAINT "shop_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "country_code_key" ON "country"("code");

-- CreateIndex
CREATE INDEX "country_code_idx" ON "country"("code");

-- CreateIndex
CREATE INDEX "district_uuid_idx" ON "district"("uuid");

-- CreateIndex
CREATE INDEX "region_uuid_districtUuid_idx" ON "region"("uuid", "districtUuid");

-- CreateIndex
CREATE INDEX "city_uuid_regionUuid_idx" ON "city"("uuid", "regionUuid");

-- CreateIndex
CREATE UNIQUE INDEX "company_name_key" ON "company"("name");

-- CreateIndex
CREATE INDEX "company_uuid_idx" ON "company"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "shop_name_key" ON "shop"("name");

-- CreateIndex
CREATE INDEX "shop_uuid_companyUuid_idx" ON "shop"("uuid", "companyUuid");

-- AddForeignKey
ALTER TABLE "region" ADD CONSTRAINT "region_districtUuid_fkey" FOREIGN KEY ("districtUuid") REFERENCES "district"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "city" ADD CONSTRAINT "city_regionUuid_fkey" FOREIGN KEY ("regionUuid") REFERENCES "region"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company" ADD CONSTRAINT "company_countryCode_fkey" FOREIGN KEY ("countryCode") REFERENCES "country"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company" ADD CONSTRAINT "company_districtUuid_fkey" FOREIGN KEY ("districtUuid") REFERENCES "district"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company" ADD CONSTRAINT "company_regionUuid_fkey" FOREIGN KEY ("regionUuid") REFERENCES "region"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company" ADD CONSTRAINT "company_cityUuid_fkey" FOREIGN KEY ("cityUuid") REFERENCES "city"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shop" ADD CONSTRAINT "shop_companyUuid_fkey" FOREIGN KEY ("companyUuid") REFERENCES "company"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
