/*
  Warnings:

  - Added the required column `compensation` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `department` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `designation` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `highestQualification` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `noticePeriod` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `compensation` VARCHAR(180) NOT NULL,
    ADD COLUMN `department` ENUM('human resource management', 'software development', 'lead generation', 'tech support') NOT NULL,
    ADD COLUMN `designation` VARCHAR(180) NOT NULL,
    ADD COLUMN `highestQualification` VARCHAR(250) NOT NULL,
    ADD COLUMN `noticePeriod` VARCHAR(180) NOT NULL,
    ADD COLUMN `password` VARCHAR(250) NOT NULL,
    ADD COLUMN `username` VARCHAR(180) NOT NULL;
