/*
  Warnings:

  - You are about to drop the column `Blood_Group` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `Department` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `Designation` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `Marital_Status` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `dob` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `doj` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `employee_id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `firstname` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `lastname` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `profile_img` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `sudoName` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `zipcode` on the `users` table. All the data in the column will be lost.
  - You are about to alter the column `email` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(180)`.
  - You are about to alter the column `phone` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(180)`.
  - You are about to alter the column `gender` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum("users_gender")`.
  - You are about to alter the column `country` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(180)`.
  - You are about to alter the column `city` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(180)`.
  - Added the required column `blood_group` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fatherName` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `houseNo` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `motherName` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nationality` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `users_email_key` ON `users`;

-- AlterTable
ALTER TABLE `employee_leaves` MODIFY `from` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `Blood_Group`,
    DROP COLUMN `Department`,
    DROP COLUMN `Designation`,
    DROP COLUMN `Marital_Status`,
    DROP COLUMN `dob`,
    DROP COLUMN `doj`,
    DROP COLUMN `employee_id`,
    DROP COLUMN `firstname`,
    DROP COLUMN `lastname`,
    DROP COLUMN `password`,
    DROP COLUMN `profile_img`,
    DROP COLUMN `sudoName`,
    DROP COLUMN `zipcode`,
    ADD COLUMN `BankName` VARCHAR(180) NULL,
    ADD COLUMN `BranchName` VARCHAR(180) NULL,
    ADD COLUMN `Dob` DATETIME(0) NULL,
    ADD COLUMN `Doj` DATETIME(0) NULL,
    ADD COLUMN `IFSCCode` VARCHAR(180) NULL,
    ADD COLUMN `SSC` VARCHAR(180) NULL,
    ADD COLUMN `TC` VARCHAR(180) NULL,
    ADD COLUMN `UPIId` VARCHAR(180) NULL,
    ADD COLUMN `aadhar` VARCHAR(180) NULL,
    ADD COLUMN `aadharNo` VARCHAR(180) NULL,
    ADD COLUMN `accountHolderName` VARCHAR(180) NULL,
    ADD COLUMN `bachelor` VARCHAR(180) NULL,
    ADD COLUMN `bankAccountNo` VARCHAR(180) NULL,
    ADD COLUMN `blood_group` VARCHAR(180) NOT NULL,
    ADD COLUMN `diploma` VARCHAR(180) NULL,
    ADD COLUMN `expectedPassoutYear` YEAR NULL,
    ADD COLUMN `experienceCertificate` VARCHAR(180) NULL,
    ADD COLUMN `facebookProfileLink` VARCHAR(180) NULL,
    ADD COLUMN `fatherName` VARCHAR(180) NOT NULL,
    ADD COLUMN `firstName` VARCHAR(180) NOT NULL,
    ADD COLUMN `guardianPhone` VARCHAR(180) NULL,
    ADD COLUMN `houseNo` VARCHAR(180) NOT NULL,
    ADD COLUMN `incrementLetter` VARCHAR(180) NULL,
    ADD COLUMN `instagramProfileLink` VARCHAR(180) NULL,
    ADD COLUMN `intermediate` VARCHAR(180) NULL,
    ADD COLUMN `lastName` VARCHAR(180) NOT NULL,
    ADD COLUMN `linkedInProfileLink` VARCHAR(180) NULL,
    ADD COLUMN `marksMemo` VARCHAR(180) NULL,
    ADD COLUMN `master` VARCHAR(180) NULL,
    ADD COLUMN `motherName` VARCHAR(180) NOT NULL,
    ADD COLUMN `nationality` VARCHAR(180) NOT NULL,
    ADD COLUMN `offerLetter` VARCHAR(180) NULL,
    ADD COLUMN `panCard` VARCHAR(180) NULL,
    ADD COLUMN `panCardNo` VARCHAR(180) NULL,
    ADD COLUMN `passoutYear` YEAR NULL,
    ADD COLUMN `passportSizePhoto` VARCHAR(180) NULL,
    ADD COLUMN `payslips` VARCHAR(180) NULL,
    ADD COLUMN `resignationLette` VARCHAR(180) NULL,
    ADD COLUMN `state` VARCHAR(180) NOT NULL,
    ADD COLUMN `street` VARCHAR(180) NOT NULL,
    ADD COLUMN `twitterProfileLink` VARCHAR(180) NULL,
    MODIFY `email` VARCHAR(180) NOT NULL,
    MODIFY `phone` VARCHAR(180) NOT NULL,
    MODIFY `gender` ENUM('Male', 'Female', 'Other', '') NOT NULL,
    MODIFY `country` VARCHAR(180) NOT NULL,
    MODIFY `city` VARCHAR(180) NOT NULL;
