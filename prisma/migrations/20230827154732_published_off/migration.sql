/*
  Warnings:

  - You are about to drop the column `published` on the `publications` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "publications" DROP COLUMN "published",
ALTER COLUMN "date" DROP DEFAULT;
