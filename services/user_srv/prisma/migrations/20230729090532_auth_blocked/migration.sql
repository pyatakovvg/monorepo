/*
  Warnings:

  - You are about to drop the `_UserRole` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `auth` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `permission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "user"."_UserRole" DROP CONSTRAINT "_UserRole_A_fkey";

-- DropForeignKey
ALTER TABLE "user"."_UserRole" DROP CONSTRAINT "_UserRole_B_fkey";

-- DropForeignKey
ALTER TABLE "user"."user" DROP CONSTRAINT "user_authUuid_fkey";

-- DropTable
DROP TABLE "user"."_UserRole";

-- DropTable
DROP TABLE "user"."auth";

-- DropTable
DROP TABLE "user"."permission";

-- DropTable
DROP TABLE "user"."role";

-- DropTable
DROP TABLE "user"."user";

-- CreateTable
CREATE TABLE "auth" (
    "uuid" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isBlocked" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "auth_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "user" (
    "uuid" UUID NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "middleName" TEXT,
    "isDeleted" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "authUuid" UUID NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "role" (
    "code" VARCHAR(255) NOT NULL,
    "displayName" TEXT NOT NULL,

    CONSTRAINT "role_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "permission" (
    "key" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,

    CONSTRAINT "permission_pkey" PRIMARY KEY ("key")
);

-- CreateTable
CREATE TABLE "_UserRole" (
    "A" VARCHAR(255) NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "auth_email_key" ON "auth"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_authUuid_key" ON "user"("authUuid");

-- CreateIndex
CREATE UNIQUE INDEX "role_code_key" ON "role"("code");

-- CreateIndex
CREATE UNIQUE INDEX "role_displayName_key" ON "role"("displayName");

-- CreateIndex
CREATE UNIQUE INDEX "permission_key_key" ON "permission"("key");

-- CreateIndex
CREATE UNIQUE INDEX "permission_displayName_key" ON "permission"("displayName");

-- CreateIndex
CREATE UNIQUE INDEX "_UserRole_AB_unique" ON "_UserRole"("A", "B");

-- CreateIndex
CREATE INDEX "_UserRole_B_index" ON "_UserRole"("B");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_authUuid_fkey" FOREIGN KEY ("authUuid") REFERENCES "auth"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserRole" ADD CONSTRAINT "_UserRole_A_fkey" FOREIGN KEY ("A") REFERENCES "role"("code") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserRole" ADD CONSTRAINT "_UserRole_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
