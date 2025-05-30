/*
  Warnings:

  - You are about to drop the `ProblemInPlayist` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProblemInPlayist" DROP CONSTRAINT "ProblemInPlayist_playlistId_fkey";

-- DropForeignKey
ALTER TABLE "ProblemInPlayist" DROP CONSTRAINT "ProblemInPlayist_problemId_fkey";

-- AlterTable
ALTER TABLE "Submission" ALTER COLUMN "stdin" DROP NOT NULL,
ALTER COLUMN "stdout" DROP NOT NULL,
ALTER COLUMN "stderr" DROP NOT NULL,
ALTER COLUMN "compileOutput" DROP NOT NULL,
ALTER COLUMN "memory" DROP NOT NULL,
ALTER COLUMN "time" DROP NOT NULL;

-- AlterTable
ALTER TABLE "TestCaseResult" ALTER COLUMN "compileOutput" DROP NOT NULL;

-- DropTable
DROP TABLE "ProblemInPlayist";

-- CreateTable
CREATE TABLE "ProblemInPlaylist" (
    "id" TEXT NOT NULL,
    "playListId" TEXT NOT NULL,
    "problemId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProblemInPlaylist_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProblemInPlaylist_playListId_problemId_key" ON "ProblemInPlaylist"("playListId", "problemId");

-- AddForeignKey
ALTER TABLE "ProblemInPlaylist" ADD CONSTRAINT "ProblemInPlaylist_playListId_fkey" FOREIGN KEY ("playListId") REFERENCES "Playlist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProblemInPlaylist" ADD CONSTRAINT "ProblemInPlaylist_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
