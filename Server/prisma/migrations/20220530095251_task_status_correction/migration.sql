/*
  Warnings:

  - The values [pendding] on the enum `task_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `task` MODIFY `status` ENUM('pending', 'completed', 'started', '') NOT NULL;

-- CreateTable
CREATE TABLE `shift_timings` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `employee_id` VARCHAR(191) NOT NULL,
    `time_in` TIME NOT NULL,
    `time_out` TIME NOT NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `policies_attedance` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `start_minutes` SMALLINT UNSIGNED NULL,
    `end_minutes` SMALLINT UNSIGNED NULL,
    `point` FLOAT NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `lop` VARCHAR(191) NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `shift_timings` ADD CONSTRAINT `shift_timings_employee_id_fkey` FOREIGN KEY (`employee_id`) REFERENCES `users`(`employee_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
