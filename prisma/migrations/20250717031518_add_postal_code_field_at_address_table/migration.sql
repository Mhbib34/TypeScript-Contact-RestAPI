/*
  Warnings:

  - Added the required column `postal_code` to the `addresses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `addresses` ADD COLUMN `postal_code` VARCHAR(10) NOT NULL;
