/*
  Warnings:

  - Added the required column `employee_id` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `employee_id` VARCHAR(255) NOT NULL,
    ADD COLUMN `status` ENUM('pending', 'rejected', 'accepted', '') NOT NULL;
