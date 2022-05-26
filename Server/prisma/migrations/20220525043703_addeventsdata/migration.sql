-- DropIndex
DROP INDEX `event_attendees_attendee_id_fkey` ON `event_attendees`;

-- DropIndex
DROP INDEX `event_to_attendees` ON `event_attendees`;

-- DropIndex
DROP INDEX `events_created_by_fkey` ON `events`;

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
