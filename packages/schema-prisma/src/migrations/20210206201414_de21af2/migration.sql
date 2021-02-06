-- CreateEnum
CREATE TYPE "Grade" AS ENUM ('FA', 'FM', 'OFM', 'HFM', 'LM', 'OLM', 'HLM', 'BM', 'OBM', 'HBM');

-- CreateEnum
CREATE TYPE "Sex" AS ENUM ('MALE', 'FEMALE', 'DIVERSE');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "DepartmentUserRole" AS ENUM ('GUEST', 'ADMIN');

-- CreateEnum
CREATE TYPE "MembershipRequestStatus" AS ENUM ('PENDING', 'APPROVED', 'DISAPPROVED');

-- CreateTable
CREATE TABLE "Exercise" (
    "id" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "timeslotId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "streetNumber" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "lat" DECIMAL(65,30),
    "long" DECIMAL(65,30),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Promotion" (
    "id" TEXT NOT NULL,
    "dateOfPromotion" TIMESTAMP(3) NOT NULL,
    "personId" TEXT NOT NULL,
    "grade" "Grade" NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Person" (
    "id" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "sex" "Sex" NOT NULL,
    "phone" TEXT NOT NULL,
    "birthName" TEXT NOT NULL,
    "placeOfBirth" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "membershipNumber" TEXT NOT NULL,
    "addressId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Timeslot" (
    "id" TEXT NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Department" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "federation" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "homepage" TEXT,
    "addressId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DepartmentMembership" (
    "id" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "entryDate" TIMESTAMP(3) NOT NULL,
    "departureDate" TIMESTAMP(3),
    "userRoles" "DepartmentUserRole"[],
    "personId" TEXT NOT NULL,
    "userId" TEXT,
    "departmentId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "uid" TEXT NOT NULL,
    "firstname" TEXT,
    "lastname" TEXT,
    "personId" TEXT,
    "userRoles" "UserRole"[],

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MembershipRequest" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "departmentId" TEXT NOT NULL,
    "status" "MembershipRequestStatus" NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MembershipInvite" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "departmentId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Exercise_Leader" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Exercise_Participant" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Exercise_Leader_AB_unique" ON "_Exercise_Leader"("A", "B");

-- CreateIndex
CREATE INDEX "_Exercise_Leader_B_index" ON "_Exercise_Leader"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Exercise_Participant_AB_unique" ON "_Exercise_Participant"("A", "B");

-- CreateIndex
CREATE INDEX "_Exercise_Participant_B_index" ON "_Exercise_Participant"("B");

-- AddForeignKey
ALTER TABLE "Exercise" ADD FOREIGN KEY ("timeslotId") REFERENCES "Timeslot"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Promotion" ADD FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Person" ADD FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Department" ADD FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DepartmentMembership" ADD FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DepartmentMembership" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DepartmentMembership" ADD FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MembershipRequest" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MembershipRequest" ADD FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MembershipInvite" ADD FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Exercise_Leader" ADD FOREIGN KEY ("A") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Exercise_Leader" ADD FOREIGN KEY ("B") REFERENCES "Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Exercise_Participant" ADD FOREIGN KEY ("A") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Exercise_Participant" ADD FOREIGN KEY ("B") REFERENCES "Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;
