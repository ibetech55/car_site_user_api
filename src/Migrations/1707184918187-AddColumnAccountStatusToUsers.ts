import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class AddColumnAccountStatusToUsers1707184918187 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('users', new TableColumn({
            name:'account_status',
            type:'VARCHAR(50)',
            isNullable:true
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users', 'account_status');
    }

}
