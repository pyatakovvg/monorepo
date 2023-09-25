-- CreateEnum
CREATE TYPE "PersonSexEnum" AS ENUM ('MALE', 'FEMALE');

-- CreateTable
CREATE TABLE "user" (
    "uuid" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isBlocked" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "claim" (
    "uuid" UUID NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "userUuid" UUID NOT NULL,

    CONSTRAINT "claim_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "role" (
    "code" VARCHAR(255) NOT NULL,
    "displayName" TEXT NOT NULL,

    CONSTRAINT "role_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "permission" (
    "code" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,

    CONSTRAINT "permission_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "person" (
    "uuid" UUID NOT NULL,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT,
    "lastName" TEXT NOT NULL,
    "birthday" TIMESTAMP(3) NOT NULL,
    "sex" "PersonSexEnum" NOT NULL,
    "userUuid" UUID NOT NULL,

    CONSTRAINT "person_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "refresh_token" (
    "uuid" UUID NOT NULL,
    "token" TEXT NOT NULL,
    "expire" TIMESTAMP(3) NOT NULL,
    "userUuid" UUID NOT NULL,

    CONSTRAINT "refresh_token_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "_role_on_user" (
    "A" VARCHAR(255) NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_permission_on_role" (
    "A" TEXT NOT NULL,
    "B" VARCHAR(255) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE INDEX "user_uuid_email_isBlocked_idx" ON "user"("uuid", "email", "isBlocked");

-- CreateIndex
CREATE UNIQUE INDEX "role_code_key" ON "role"("code");

-- CreateIndex
CREATE UNIQUE INDEX "role_displayName_key" ON "role"("displayName");

-- CreateIndex
CREATE UNIQUE INDEX "permission_code_key" ON "permission"("code");

-- CreateIndex
CREATE UNIQUE INDEX "permission_displayName_key" ON "permission"("displayName");

-- CreateIndex
CREATE INDEX "person_uuid_firstName_lastName_sex_birthday_idx" ON "person"("uuid", "firstName", "lastName", "sex", "birthday");

-- CreateIndex
CREATE UNIQUE INDEX "person_userUuid_key" ON "person"("userUuid");

-- CreateIndex
CREATE UNIQUE INDEX "refresh_token_userUuid_key" ON "refresh_token"("userUuid");

-- CreateIndex
CREATE UNIQUE INDEX "_role_on_user_AB_unique" ON "_role_on_user"("A", "B");

-- CreateIndex
CREATE INDEX "_role_on_user_B_index" ON "_role_on_user"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_permission_on_role_AB_unique" ON "_permission_on_role"("A", "B");

-- CreateIndex
CREATE INDEX "_permission_on_role_B_index" ON "_permission_on_role"("B");

-- AddForeignKey
ALTER TABLE "claim" ADD CONSTRAINT "claim_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "user"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "person" ADD CONSTRAINT "person_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "user"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "refresh_token" ADD CONSTRAINT "refresh_token_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "user"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_role_on_user" ADD CONSTRAINT "_role_on_user_A_fkey" FOREIGN KEY ("A") REFERENCES "role"("code") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_role_on_user" ADD CONSTRAINT "_role_on_user_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_permission_on_role" ADD CONSTRAINT "_permission_on_role_A_fkey" FOREIGN KEY ("A") REFERENCES "permission"("code") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_permission_on_role" ADD CONSTRAINT "_permission_on_role_B_fkey" FOREIGN KEY ("B") REFERENCES "role"("code") ON DELETE CASCADE ON UPDATE CASCADE;
