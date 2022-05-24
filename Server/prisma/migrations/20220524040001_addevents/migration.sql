-- CreateTable
CREATE TABLE `attendance` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `log_in` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `log_out` TIMESTAMP(0) NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `employee_id` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `breaks` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `break_start` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `break_end` TIMESTAMP(0) NULL,
    `attendanceId` INTEGER UNSIGNED NULL,

    INDEX `Break_attendanceId_fkey`(`attendanceId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
