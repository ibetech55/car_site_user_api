import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class AddColumnLongitueAndLatitudeToAddresses1714782764847 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('addresses', new TableColumn({
            name:'latitude',
            type:'NUMERIC',
            isNullable:true
        }))
        await queryRunner.addColumn('addresses', new TableColumn({
            name:'longitude',
            type:'NUMERIC',
            isNullable:true
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('addresses', 'latitude');
        await queryRunner.dropColumn('addresses', 'longitude');
    }

}
