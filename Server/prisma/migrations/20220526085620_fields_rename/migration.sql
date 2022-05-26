/*
  Warnings:

  - You are about to drop the column `attendanceId` on the `breaks` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `task` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `breaks` DROP FOREIGN KEY `Break_attendanceId_fkey`;

-- AlterTable
ALTER TABLE `breaks` DROP COLUMN `attendanceId`,
    ADD COLUMN `attendance_Id` INTEGER UNSIGNED NULL;

-- AlterTable
ALTER TABLE `task` DROP COLUMN `createdAt`,
    ADD COLUMN `created_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6);

-- CreateIndex
CREATE INDEX `Break_attendance_Id_fkey` ON `breaks`(`attendance_Id`);

-- AddForeignKey
ALTER TABLE `breaks` ADD CONSTRAINT `Break_attendance_Id_fkey` FOREIGN KEY (`attendance_Id`) REFERENCES `attendance`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
