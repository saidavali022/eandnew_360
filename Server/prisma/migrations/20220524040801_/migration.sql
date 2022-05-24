-- CreateTable
CREATE TABLE `event_attendees` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `event_id` VARCHAR(191) NOT NULL,
    `attendee_id` VARCHAR(255) NULL,
    `location` VARCHAR(255) NULL,
    `name` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `response` TEXT NULL,
    `email` VARCHAR(191) NULL,

    INDEX `event_attendees_attendee_id_fkey`(`attendee_id`),
    INDEX `event_to_attendees`(`event_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `events` (
    `event_id` VARCHAR(191) NOT NULL,
    `created_by` VARCHAR(191) NOT NULL,
    `description` VARCHAR(255) NULL,
    `end` DATETIME(3) NOT NULL,
    `kind` VARCHAR(191) NOT NULL,
    `start` DATETIME(3) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `interview_status` TEXT NULL,
    `status` VARCHAR(255) NULL,

    INDEX `events_created_by_fkey`(`created_by`),
    PRIMARY KEY (`event_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
