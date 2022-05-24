/*
  Warnings:

  - You are about to alter the column `department` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Enum("users_department")` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE `users` MODIFY `department` VARCHAR(255) NOT NULL DEFAULT '';
