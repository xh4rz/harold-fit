import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersImages1787999731322 implements MigrationInterface {
    name = 'CreateUsersImages1787999731322'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users_images" ("id" SERIAL NOT NULL, "url" text NOT NULL, "publicId" text NOT NULL, "userId" uuid, CONSTRAINT "REL_9fd5e65a28681a76b2d769f034" UNIQUE ("userId"), CONSTRAINT "PK_43bb3c9912eb01e30a58f065b68" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD "description" text`);
        await queryRunner.query(`CREATE TYPE "public"."users_gender_enum" AS ENUM('1', '2', '3')`);
        await queryRunner.query(`ALTER TABLE "users" ADD "gender" "public"."users_gender_enum"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "birthDate" date`);
        await queryRunner.query(`ALTER TABLE "users_images" ADD CONSTRAINT "FK_9fd5e65a28681a76b2d769f0345" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_images" DROP CONSTRAINT "FK_9fd5e65a28681a76b2d769f0345"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "birthDate"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "gender"`);
        await queryRunner.query(`DROP TYPE "public"."users_gender_enum"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "description"`);
        await queryRunner.query(`DROP TABLE "users_images"`);
    }

}
