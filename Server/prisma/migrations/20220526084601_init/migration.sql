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

-- CreateTable
CREATE TABLE `checklists` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `employee_id` VARCHAR(191) NOT NULL,
    `id_card` BOOLEAN NOT NULL,
    `cell_phone` BOOLEAN NOT NULL,
    `laptop` BOOLEAN NOT NULL,
    `files` BOOLEAN NOT NULL,
    `key_s` BOOLEAN NOT NULL,
    `check_status` ENUM('pending', 'completed', '') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `employee_complants_advices_suggestions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `employee_id` VARCHAR(255) NOT NULL,
    `created_at` DATE NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `message` LONGTEXT NOT NULL,
    `status` ENUM('pending', 'accepted', 'rejected', '') NOT NULL,
    `letter_type` ENUM('complaints', 'advices_suggestions') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `employee_leaves` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `employee_id` VARCHAR(255) NOT NULL,
    `leave_status` ENUM('pending', 'accepted', 'rejected', '') NOT NULL,
    `leave_dates` VARCHAR(255) NOT NULL,
    `reason` TEXT NOT NULL,
    `permission_type` ENUM('', 'leave', 'latelogin', 'earlylogout') NOT NULL,
    `created_at` DATE NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `from` VARCHAR(255) NOT NULL,
    `to` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `employee_letters` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `employee_id` VARCHAR(255) NOT NULL,
    `letter_type` ENUM('probation', 'offer', 'increment', 'relieving', 'exprience', 'others') NOT NULL,
    `letter` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `employee_resignation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `employee_id` VARCHAR(191) NOT NULL,
    `reason` LONGTEXT NOT NULL,
    `created_at` DATE NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `end_date` DATE NOT NULL,
    `start_date` DATE NOT NULL,
    `status` ENUM('pending', 'accepted', 'rejected', '') NOT NULL,
    `send_check_list` ENUM('pending', 'awaiting', 'completed') NOT NULL,
    `send_feedback_form` ENUM('pending', 'awaiting', 'completed') NOT NULL,

    INDEX `id`(`id`),
    PRIMARY KEY (`employee_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `event_attendees` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `event_id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `name` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `location` VARCHAR(255) NULL,
    `response` TEXT NULL,
    `attendee_id` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `events` (
    `event_id` VARCHAR(191) NOT NULL,
    `created_by` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(255) NULL,
    `start` DATETIME(3) NOT NULL,
    `end` DATETIME(3) NOT NULL,
    `kind` VARCHAR(191) NOT NULL,
    `status` VARCHAR(255) NULL,
    `interview_status` TEXT NULL,

    PRIMARY KEY (`event_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `feedback` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `feed_from_id` INTEGER NOT NULL DEFAULT 1,
    `employee_id` VARCHAR(255) NOT NULL,
    `fed_question_1` TEXT NOT NULL,
    `fed_question_2` TEXT NOT NULL,
    `fed_question_3` TEXT NOT NULL,
    `fed_question_4` TEXT NOT NULL,
    `fed_question_5` TEXT NOT NULL,
    `fed_question_6` TEXT NOT NULL,
    `fed_question_7` TEXT NOT NULL,
    `fed_question_8` TEXT NOT NULL,
    `fed_question_9` TEXT NOT NULL,
    `fed_question_10` TEXT NOT NULL,
    `fed_question_11` TEXT NOT NULL,
    `status` ENUM('pending', 'send', '') NOT NULL,
    `created_at` DATE NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `id`(`id`),
    PRIMARY KEY (`employee_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `feedback_questions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `feed_from_id` INTEGER NOT NULL DEFAULT 1,
    `feed_quasion_id` INTEGER NOT NULL,
    `question` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `task` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `attachment` VARCHAR(191) NOT NULL,
    `team` VARCHAR(191) NOT NULL,
    `employee_id` VARCHAR(191) NOT NULL,
    `start_date` DATETIME(3) NOT NULL,
    `end_date` DATETIME(3) NOT NULL,
    `createdAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `status` ENUM('pendding', 'completed', 'started', '') NOT NULL,
    `priority` VARCHAR(191) NULL DEFAULT 'low',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(180) NOT NULL,
    `phone` VARCHAR(180) NOT NULL,
    `gender` ENUM('Male', 'Female', 'Other', '') NOT NULL,
    `country` VARCHAR(180) NOT NULL,
    `city` VARCHAR(180) NOT NULL,
    `bank_name` VARCHAR(180) NULL,
    `branch_name` VARCHAR(180) NULL,
    `dob` DATETIME(0) NULL,
    `doj` DATETIME(0) NULL,
    `ifsc_code` VARCHAR(180) NULL,
    `ssc` VARCHAR(180) NULL,
    `TC` VARCHAR(180) NULL,
    `upi_id` VARCHAR(180) NULL,
    `aadhar_img` VARCHAR(180) NULL,
    `aadhar_no` VARCHAR(180) NULL,
    `account_holder_name` VARCHAR(180) NULL,
    `bachelor` VARCHAR(180) NULL,
    `bank_account_no` VARCHAR(180) NULL,
    `blood_group` VARCHAR(180) NOT NULL,
    `diploma` VARCHAR(180) NULL,
    `expected_passout_year` YEAR NULL,
    `experience_certificate` VARCHAR(180) NULL,
    `facebook_profile_link` VARCHAR(180) NULL,
    `father_name` VARCHAR(180) NOT NULL,
    `first_name` VARCHAR(180) NOT NULL,
    `guardian_phone` VARCHAR(180) NULL,
    `house_no` VARCHAR(180) NOT NULL,
    `increment_letter` VARCHAR(180) NULL,
    `instagram_profile_link` VARCHAR(180) NULL,
    `intermediate` VARCHAR(180) NULL,
    `last_name` VARCHAR(180) NOT NULL,
    `linkedin_profile_ink` VARCHAR(180) NULL,
    `marks_memo` VARCHAR(180) NULL,
    `master` VARCHAR(180) NULL,
    `mother_name` VARCHAR(180) NOT NULL,
    `nationality` VARCHAR(180) NOT NULL,
    `offer_letter` VARCHAR(180) NULL,
    `pancard_img` VARCHAR(180) NULL,
    `pancard_no` VARCHAR(180) NULL,
    `pass_out_year` YEAR NULL,
    `passport_size_photo` VARCHAR(180) NULL,
    `pay_slips` VARCHAR(180) NULL,
    `resignation_letter` VARCHAR(180) NULL,
    `state` VARCHAR(180) NOT NULL,
    `street` VARCHAR(180) NOT NULL,
    `twitter_profile_link` VARCHAR(180) NULL,
    `employee_id` VARCHAR(255) NOT NULL DEFAULT '0',
    `status` ENUM('pending', 'rejected', 'accepted', '') NOT NULL DEFAULT 'pending',
    `compensation` VARCHAR(180) NOT NULL DEFAULT '',
    `department` VARCHAR(255) NOT NULL DEFAULT '',
    `designation` VARCHAR(180) NOT NULL DEFAULT '',
    `highest_qualification` VARCHAR(250) NOT NULL,
    `notice_period` VARCHAR(180) NOT NULL DEFAULT '',
    `password` VARCHAR(250) NOT NULL DEFAULT '',
    `username` VARCHAR(180) NOT NULL,
    `role` ENUM('user', 'hr', 'admin') NOT NULL DEFAULT 'user',

    UNIQUE INDEX `users_employee_id_key`(`employee_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `attendance` ADD CONSTRAINT `Attendance_user_id_fkey` FOREIGN KEY (`employee_id`) REFERENCES `users`(`employee_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `breaks` ADD CONSTRAINT `Break_attendanceId_fkey` FOREIGN KEY (`attendanceId`) REFERENCES `attendance`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `event_attendees` ADD CONSTRAINT `event_attendees_event_id_fkey` FOREIGN KEY (`event_id`) REFERENCES `events`(`event_id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `event_attendees` ADD CONSTRAINT `event_attendees_attendee_id_fkey` FOREIGN KEY (`attendee_id`) REFERENCES `users`(`employee_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `events` ADD CONSTRAINT `events_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `users`(`employee_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
