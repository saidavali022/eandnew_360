/*
  Warnings:

  - Added the required column `from` to the `employee_leaves` table without a default value. This is not possible if the table is not empty.
  - Added the required column `to` to the `employee_leaves` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `employee_leaves` ADD COLUMN `create_at` DATE NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `from` VARCHAR(25) NOT NULL,
    ADD COLUMN `to` VARCHAR(255) NOT NULL;
