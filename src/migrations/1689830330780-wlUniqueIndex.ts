import { MigrationInterface, QueryRunner } from "typeorm"

export class WlUniqueIndex1689830330780 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `db.worklog.createIndex( { date: 1, username: 1 }, { unique: true } )`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `db.worklog.dropIndex( { date: 1, username: 1 } )`
        )

    }

}
