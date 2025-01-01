/*
  Warnings:

  - You are about to drop the column `users_username` on the `contacts` table. All the data in the column will be lost.
  - Added the required column `user_username` to the `contacts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `contacts` DROP FOREIGN KEY `contacts_users_username_fkey`;

-- DropIndex
DROP INDEX `contacts_users_username_fkey` ON `contacts`;

-- AlterTable
ALTER TABLE `contacts` DROP COLUMN `users_username`,
    ADD COLUMN `user_username` VARCHAR(100) NOT NULL;

-- AddForeignKey
ALTER TABLE `contacts` ADD CONSTRAINT `contacts_user_username_fkey` FOREIGN KEY (`user_username`) REFERENCES `users`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;
