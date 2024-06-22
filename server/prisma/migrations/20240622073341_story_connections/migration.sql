/*
  Warnings:

  - You are about to drop the column `favs` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `stories` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `profileId` on the `Story` table. All the data in the column will be lost.
  - The `theme` column on the `Story` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "Story" DROP CONSTRAINT "Story_profileId_fkey";

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "favs",
DROP COLUMN "stories";

-- AlterTable
ALTER TABLE "Story" DROP COLUMN "profileId",
DROP COLUMN "theme",
ADD COLUMN     "theme" TEXT[];

-- CreateTable
CREATE TABLE "_ProfileStories" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_FavStories" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProfileStories_AB_unique" ON "_ProfileStories"("A", "B");

-- CreateIndex
CREATE INDEX "_ProfileStories_B_index" ON "_ProfileStories"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_FavStories_AB_unique" ON "_FavStories"("A", "B");

-- CreateIndex
CREATE INDEX "_FavStories_B_index" ON "_FavStories"("B");

-- AddForeignKey
ALTER TABLE "_ProfileStories" ADD CONSTRAINT "_ProfileStories_A_fkey" FOREIGN KEY ("A") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProfileStories" ADD CONSTRAINT "_ProfileStories_B_fkey" FOREIGN KEY ("B") REFERENCES "Story"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavStories" ADD CONSTRAINT "_FavStories_A_fkey" FOREIGN KEY ("A") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavStories" ADD CONSTRAINT "_FavStories_B_fkey" FOREIGN KEY ("B") REFERENCES "Story"("id") ON DELETE CASCADE ON UPDATE CASCADE;
