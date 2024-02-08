import { MigrationInterface, QueryRunner } from "typeorm"

export class RemoveAccessCodeColumnTableUsers1707170148674 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users', 'access_code')
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
