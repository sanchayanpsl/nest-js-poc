import { MigrationInterface, QueryRunner } from "typeorm";
import { PostgresQueryRunner } from "typeorm/driver/postgres/PostgresQueryRunner";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
export class AutoMigration1713953300577 implements MigrationInterface {
  // eslint-disable-next-line @typescript-eslint/typedef
  name = "AutoMigration1713953300577";

  public async up(queryRunner: PostgresQueryRunner): Promise<void> {
    const { schema } = queryRunner.connection
      .options as PostgresConnectionOptions;
    await queryRunner.query(
      `CREATE  TABLE "${schema}"."address"("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" timestamp without time zone NOT NULL DEFAULT now(), "updated_at" timestamp without time zone NOT NULL DEFAULT now(), "name" character varying NOT NULL, CONSTRAINT "PK_${schema}_address" PRIMARY KEY ("id"));`
    );
    await queryRunner.query(
      `CREATE  TABLE "${schema}"."user"("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" timestamp without time zone NOT NULL DEFAULT now(), "updated_at" timestamp without time zone NOT NULL DEFAULT now(), "name" character varying NOT NULL, "age" integer NOT NULL, CONSTRAINT "PK_${schema}_user" PRIMARY KEY ("id"));`
    );
    await queryRunner.query(
      `CREATE  TABLE "${schema}"."company"("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" timestamp without time zone NOT NULL DEFAULT now(), "updated_at" timestamp without time zone NOT NULL DEFAULT now(), "name" character varying NOT NULL, CONSTRAINT "PK_${schema}_company" PRIMARY KEY ("id"));`
    );
    await queryRunner.query(
      `CREATE  TABLE "${schema}"."contact"("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" timestamp without time zone NOT NULL DEFAULT now(), "updated_at" timestamp without time zone NOT NULL DEFAULT now(), "name" character varying NOT NULL, CONSTRAINT "PK_${schema}_contact" PRIMARY KEY ("id"));`
    );
    await queryRunner.query(
      `CREATE  TABLE "${schema}"."product"("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" timestamp without time zone NOT NULL DEFAULT now(), "updated_at" timestamp without time zone NOT NULL DEFAULT now(), "name" character varying NOT NULL, CONSTRAINT "PK_${schema}_product" PRIMARY KEY ("id"));`
    );
    await queryRunner.query(
      `CREATE  TABLE "${schema}"."tenants"("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" timestamp without time zone NOT NULL DEFAULT now(), "updated_at" timestamp without time zone NOT NULL DEFAULT now(), "name" character varying NOT NULL, CONSTRAINT "PK_${schema}_tenants" PRIMARY KEY ("id"));`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    //tset
  }
}
