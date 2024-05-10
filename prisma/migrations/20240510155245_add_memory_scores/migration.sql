-- CreateTable
CREATE TABLE "MemoryScores" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MemoryScores_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MemoryScores" ADD CONSTRAINT "MemoryScores_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
