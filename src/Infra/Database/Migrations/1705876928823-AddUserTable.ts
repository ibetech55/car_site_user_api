import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class AddUserTable1705876928823 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "_id",
            type: "uuid",
            isPrimary: true,
            isNullable: false,
          },
          {
            name: "email",
            type: "varchar(100)",
            isNullable: false,
          },
          {
            name: "user_type",
            type: "varchar(100)",
            isNullable: false,
          },
          {
            name: "active",
            type: "bool",
            isNullable: false,
          },
          {
            name: "address_id",
            type: "uuid",
            isNullable: true,
          },
          {
            name: "access_code",
            type: "varchar(100)",
            isNullable: true,
          },
          {
            name: "password",
            type: "text",
            isNullable: false,
          },
          {
            name: "phone_number",
            type: "text",
            isNullable: false,
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
        foreignKeys: [
          {
            columnNames: ["address_id"],
            referencedColumnNames: ["_id"],
            referencedTableName: "addresses",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
