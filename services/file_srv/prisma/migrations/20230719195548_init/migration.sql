-- CreateTable
CREATE TABLE "user" (
    "uuid" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "mime" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "blob" BYTEA NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE INDEX "user_uuid_title_idx" ON "user"("uuid", "title");
