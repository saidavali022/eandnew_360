/*
  Warnings:

  - You are about to alter the column `created_at` on the `policies_attedance` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to drop the column `time_in` on the `shift_timings` table. All the data in the column will be lost.
  - You are about to drop the column `time_out` on the `shift_timings` table. All the data in the column will be lost.
  - You are about to alter the column `created_at` on the `shift_timings` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to drop the column `TC` on the `users` table. All the data in the column will be lost.
  - Added the required column `shift_in` to the `attendance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shift_out` to the `attendance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shift_in` to the `shift_timings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shift_out` to the `shift_timings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `attendance` ADD COLUMN `shift_in` TIME NOT NULL,
    ADD COLUMN `shift_out` TIME NOT NULL,
    MODIFY `log_in` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `log_out` DATETIME(3) NULL,
    MODIFY `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updated_at` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `policies_attedance` MODIFY `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `shift_timings` DROP COLUMN `time_in`,
    DROP COLUMN `time_out`,
    ADD COLUMN `shift_in` TIME NOT NULL,
    ADD COLUMN `shift_out` TIME NOT NULL,
    MODIFY `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `users` DROP COLUMN `TC`,
    ADD COLUMN `transfer_certificate` VARCHAR(180) NULL,
    MODIFY `country` VARCHAR(180) NULL,
    MODIFY `city` VARCHAR(180) NULL,
    MODIFY `blood_group` VARCHAR(180) NULL,
    MODIFY `house_no` VARCHAR(180) NULL,
    MODIFY `mother_name` VARCHAR(180) NULL,
    MODIFY `nationality` VARCHAR(180) NULL,
    MODIFY `state` VARCHAR(180) NULL,
    MODIFY `street` VARCHAR(180) NULL,
    MODIFY `compensation` VARCHAR(180) NULL,
    MODIFY `department` VARCHAR(255) NULL,
    MODIFY `designation` VARCHAR(180) NULL,
    MODIFY `highest_qualification` VARCHAR(250) NULL,
    MODIFY `notice_period` VARCHAR(180) NULL,
    ALTER COLUMN `password` DROP DEFAULT;
