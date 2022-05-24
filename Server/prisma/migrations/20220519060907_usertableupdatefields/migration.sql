-- AlterTable
ALTER TABLE `users` MODIFY `compensation` VARCHAR(180) NOT NULL DEFAULT '',
    MODIFY `department` ENUM('', 'human resource management', 'software development', 'lead generation', 'tech support') NOT NULL DEFAULT '',
    MODIFY `designation` VARCHAR(180) NOT NULL DEFAULT '',
    MODIFY `noticePeriod` VARCHAR(180) NOT NULL DEFAULT '',
    MODIFY `password` VARCHAR(250) NOT NULL DEFAULT '';
