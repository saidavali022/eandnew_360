-- AlterTable
ALTER TABLE `users` MODIFY `role` ENUM('user', 'hr', 'admin') NOT NULL DEFAULT 'user';
