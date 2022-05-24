/*
  Warnings:

  - The values [pending] on the enum `task_status` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `blood_group` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `department` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `designation` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `first_name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `marital_status` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `sudo_name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `zip_code` on the `users` table. All the data in the column will be lost.
  - Added the required column `Blood_Group` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Department` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Designation` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Marital_Status` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstname` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastname` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sudoName` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zipcode` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `task` MODIFY `status` ENUM('pendding', 'completed', 'started', '') NOT NULL;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `blood_group`,
    DROP COLUMN `department`,
    DROP COLUMN `designation`,
    DROP COLUMN `first_name`,
    DROP COLUMN `last_name`,
    DROP COLUMN `marital_status`,
    DROP COLUMN `sudo_name`,
    DROP COLUMN `zip_code`,
    ADD COLUMN `Blood_Group` VARCHAR(191) NOT NULL,
    ADD COLUMN `Department` VARCHAR(191) NOT NULL,
    ADD COLUMN `Designation` VARCHAR(191) NOT NULL,
    ADD COLUMN `Marital_Status` VARCHAR(191) NOT NULL,
    ADD COLUMN `firstname` VARCHAR(191) NOT NULL,
    ADD COLUMN `lastname` VARCHAR(191) NOT NULL,
    ADD COLUMN `sudoName` VARCHAR(191) NOT NULL,
    ADD COLUMN `zipcode` VARCHAR(191) NOT NULL;
