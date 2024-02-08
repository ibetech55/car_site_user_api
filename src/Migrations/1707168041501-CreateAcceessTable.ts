import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateAcceessTable1707168041501 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: "access",
              columns: [
                {
                  name: "_id",
                  type: "uuid",
                  isPrimary: true,
                  isNullable: false,
                },
                {
                  name: "access_code",
                  type: "varchar(20)",
                  isNullable: false,
                },
                {
                  name: "access_code_token",
                  type: "text",
                  isNullable: true,
                },
                {
                  name: "active",
                  type: "bool",
                  isNullable: true,
                },
                {
                  name: "type",
                  type: "varchar(100)",
                  isNullable: true,
                },
                {
                  name: "user_id",
                  type: "uuid",
                  isNullable: true,
                },
                {
                  name: "created_at",
                  type: "TIMESTAMPTZ",
                  default: "NOW()",
                  isNullable: false,
                },
                {
                  name: "updated_at",
                  type: "TIMESTAMPTZ",
                  isNullable: true,
                },
                {
                  name: "deleted_at",
                  type: "TIMESTAMPTZ",
                  isNullable: true,
                },
              ],
              foreignKeys:[
                {
                  columnNames:['user_id'],
                  referencedColumnNames:['_id'],
                  referencedTableName:'users'
                }
              ]
            })
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('access')
    }

}
