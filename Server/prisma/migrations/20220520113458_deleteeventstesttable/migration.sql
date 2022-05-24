/*
  Warnings:

  - You are about to drop the `event_attendees` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `events` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `event_attendees` DROP FOREIGN KEY `event_to_attendees`;

-- DropTable
DROP TABLE `event_attendees`;

-- DropTable
DROP TABLE `events`;
