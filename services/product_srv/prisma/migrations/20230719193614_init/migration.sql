-- CreateEnum
CREATE TYPE "FeatureTypeEnum" AS ENUM ('DEFAULT', 'CHECKBOX', 'DATE', 'NUMBER', 'COLOR');

-- CreateEnum
CREATE TYPE "FeatureStatusEnum" AS ENUM ('SHOW', 'HIDE', 'OFF');

-- CreateTable
CREATE TABLE "company" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
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

-- CreateTable
CREATE TABLE "product" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "shopUuid" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "category" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "parentUuid" UUID,

    CONSTRAINT "category_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "category_on_product" (
    "productUuid" UUID NOT NULL,
    "categoryUuid" UUID NOT NULL,

    CONSTRAINT "category_on_product_pkey" PRIMARY KEY ("productUuid","categoryUuid")
);

-- CreateTable
CREATE TABLE "unit" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "code" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "unit_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "image" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,

    CONSTRAINT "image_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "image_on_product" (
    "productUuid" UUID NOT NULL,
    "imageUuid" UUID NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "image_on_product_pkey" PRIMARY KEY ("productUuid","imageUuid")
);

-- CreateTable
CREATE TABLE "feature" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" "FeatureTypeEnum" NOT NULL DEFAULT 'DEFAULT',
    "isShowInProductTab" BOOLEAN NOT NULL DEFAULT true,
    "isShowInProductList" BOOLEAN NOT NULL DEFAULT false,
    "isShowInProductHeader" BOOLEAN NOT NULL DEFAULT false,
    "status" "FeatureStatusEnum" NOT NULL DEFAULT 'SHOW',
    "groupUuid" UUID,
    "unitUuid" UUID,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "feature_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "feature_group" (
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "feature_group_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "feature_on_category" (
    "featureUuid" UUID NOT NULL,
    "categoryUuid" UUID NOT NULL,

    CONSTRAINT "feature_on_category_pkey" PRIMARY KEY ("featureUuid","categoryUuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "company_name_key" ON "company"("name");

-- CreateIndex
CREATE INDEX "company_uuid_idx" ON "company"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "shop_name_key" ON "shop"("name");

-- CreateIndex
CREATE INDEX "shop_uuid_companyUuid_idx" ON "shop"("uuid", "companyUuid");

-- CreateIndex
CREATE INDEX "product_uuid_shopUuid_idx" ON "product"("uuid", "shopUuid");

-- CreateIndex
CREATE INDEX "category_uuid_parentUuid_code_idx" ON "category"("uuid", "parentUuid", "code");

-- CreateIndex
CREATE INDEX "unit_uuid_code_idx" ON "unit"("uuid", "code");

-- AddForeignKey
ALTER TABLE "shop" ADD CONSTRAINT "shop_companyUuid_fkey" FOREIGN KEY ("companyUuid") REFERENCES "company"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_shopUuid_fkey" FOREIGN KEY ("shopUuid") REFERENCES "shop"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category" ADD CONSTRAINT "category_parentUuid_fkey" FOREIGN KEY ("parentUuid") REFERENCES "category"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category_on_product" ADD CONSTRAINT "category_on_product_productUuid_fkey" FOREIGN KEY ("productUuid") REFERENCES "product"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category_on_product" ADD CONSTRAINT "category_on_product_categoryUuid_fkey" FOREIGN KEY ("categoryUuid") REFERENCES "category"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "image_on_product" ADD CONSTRAINT "image_on_product_productUuid_fkey" FOREIGN KEY ("productUuid") REFERENCES "product"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "image_on_product" ADD CONSTRAINT "image_on_product_imageUuid_fkey" FOREIGN KEY ("imageUuid") REFERENCES "image"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feature" ADD CONSTRAINT "feature_groupUuid_fkey" FOREIGN KEY ("groupUuid") REFERENCES "feature_group"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feature" ADD CONSTRAINT "feature_unitUuid_fkey" FOREIGN KEY ("unitUuid") REFERENCES "unit"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feature_on_category" ADD CONSTRAINT "feature_on_category_featureUuid_fkey" FOREIGN KEY ("featureUuid") REFERENCES "feature"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feature_on_category" ADD CONSTRAINT "feature_on_category_categoryUuid_fkey" FOREIGN KEY ("categoryUuid") REFERENCES "category"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
