/*
  Warnings:

  - You are about to alter the column `created_at` on the `policies_attedance` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `created_at` on the `shift_timings` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - Made the column `employee_id` on table `attendance` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `attendance` DROP FOREIGN KEY `Attendance_user_id_fkey`;

-- AlterTable
ALTER TABLE `attendance` ADD COLUMN `status` ENUM('break', 'available', 'unavailable', 'salah') NOT NULL DEFAULT 'unavailable',
    MODIFY `log_in` TIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `log_out` TIME NULL,
    MODIFY `employee_id` VARCHAR(191) NOT NULL,
    MODIFY `shift_in` TIME NOT NULL,
    MODIFY `shift_out` TIME NOT NULL;

-- AlterTable
ALTER TABLE `policies_attedance` MODIFY `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `shift_timings` MODIFY `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `shift_in` TIME NOT NULL,
    MODIFY `shift_out` TIME NOT NULL;

-- AddForeignKey
ALTER TABLE `attendance` ADD CONSTRAINT `Attendance_user_id_fkey` FOREIGN KEY (`employee_id`) REFERENCES `users`(`employee_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
