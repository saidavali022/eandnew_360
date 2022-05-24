-- AlterTable
ALTER TABLE `users` MODIFY `status` ENUM('pending', 'rejected', 'accepted', '') NOT NULL DEFAULT 'pending';
