/*
  Warnings:

  - You are about to alter the column `is_active` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Enum("user_is_active")` to `TinyInt`.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `is_active` BOOLEAN NOT NULL DEFAULT true;
