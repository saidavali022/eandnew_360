/*
  Warnings:

  - You are about to alter the column `created_at` on the `policies_attedance` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `created_at` on the `shift_timings` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- AlterTable
ALTER TABLE `attendance` MODIFY `log_in` TIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `log_out` TIME NULL,
    MODIFY `shift_in` TIME NOT NULL,
    MODIFY `shift_out` TIME NOT NULL;

-- AlterTable
ALTER TABLE `policies_attedance` MODIFY `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `shift_timings` MODIFY `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `shift_in` TIME NOT NULL,
    MODIFY `shift_out` TIME NOT NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `dob` DATE NULL,
    MODIFY `doj` DATE NULL;
