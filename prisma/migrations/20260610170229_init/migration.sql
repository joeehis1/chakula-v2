-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "passwordHash" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attribute" (
    "id" SERIAL NOT NULL,
    "age" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "sexAtBirth" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Attribute_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Attribute_userId_key" ON "Attribute"("userId");

-- AddForeignKey
ALTER TABLE "Attribute" ADD CONSTRAINT "Attribute_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
