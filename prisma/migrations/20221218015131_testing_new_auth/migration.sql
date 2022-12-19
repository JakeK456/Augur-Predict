-- CreateTable
CREATE TABLE "UserTest" (
    "id" TEXT NOT NULL,
    "registeredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isActive" TEXT NOT NULL DEFAULT '1',

    CONSTRAINT "UserTest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfileTest" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "avatar" TEXT,

    CONSTRAINT "ProfileTest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserTest_email_key" ON "UserTest"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ProfileTest_userId_key" ON "ProfileTest"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ProfileTest_username_key" ON "ProfileTest"("username");

-- AddForeignKey
ALTER TABLE "ProfileTest" ADD CONSTRAINT "ProfileTest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserTest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
