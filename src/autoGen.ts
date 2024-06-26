const { createConnection, getConnectionOptions } = require("typeorm");
const path = require("path");
const fs = require("fs");
// const Tenants = require("./modules/public/tenants/tenant.entity");
async function analizeEntitySchema() {
  const connectionOptions = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "nest-crud",
    logging: true,
    autoLoadEntities: true,
    // synchronize: true,
    entities: [
      path.join(__dirname, "./modules/tenanted/**/*.entity{.ts,.js}"),
      path.join(__dirname, "./modules/public/**/*.entity{.ts,.js}"),
    ],
    migrations: [path.join(__dirname, "./migrations/tenanted/*{.ts,.js}")],
    cli: {
      migrationsDir: "src/migrations/tenanted",
    },
  };

  // const connectionOptions = await getConnectionOptions();
  const connection = await createConnection({
    ...connectionOptions,
    name: "tempConnection",
  });

  const tenantRepo = connection.getRepository("Tenant");
  const tenants = await tenantRepo.find();

  const schema = new Map();

  tenants.forEach((tenant) => {
    const schemaName = `tenant_${tenant.id}`;
    schema.set(schemaName, []);
  });
  connection.entityMetadatas.forEach((metadata) => {
    const schemaName = `tenant_${metadata.schema || "public"}`;
    const entities = schema.get(schemaName) || [];

    entities.push(metadata);
    schema.set(schemaName, entities);
  });

  await connection.close();
  return schema;
}

const typeMapping = {
  String: "character varying",
  Number: "integer",
  uuid: "uuid",
  "timestamp without time zone": "timestamp without time zone",
};

//Generate Migration Script
async function generateMigrationScript() {
  const schema = await analizeEntitySchema();
  const migrationSQL = [];

  schema.forEach((entities, schemaName) => {
    const createSchemaSQL = `\`CREATE SCHEMA IF NOT EXISTS "${schemaName}";\``;
    migrationSQL.push(createSchemaSQL);

    entities.forEach((entity) => {
      const tableName = entity.tableName;
      const columns = entity.columns
        .map((column) => {
          let defaultClause = "";
          if (
            column.databaseName === "created_at" ||
            column.databaseName === "updated_at"
          ) {
            defaultClause = ` DEFAULT now()`;
          } else if (column.default !== undefined) {
            defaultClause = ` DEFAULT ${column.default}`;
          }

          let type = typeMapping[column.type];
          console.log(column.type);

          if (typeof column.type === "function") {
            console.log(column.type.name, "-------------");
            type = typeMapping[column.type.name];
          }
          // if (type === "varchar" || type === "String")
          //   type = "character varying";
          // console.log(type, "after");

          let defaultClauseValue = "";

          if (column.databaseName === "id" && column.type === "uuid") {
            defaultClauseValue = " DEFAULT uuid_generate_v4()";
          }
          // return `"${column.databaseName}" ${column.type}${
          //   column.default !== undefined ? ` DEFAULT ${column.default}` : ""
          // }${column.isNullable ? " NULL" : " NOT NULL"}`;

          return `"${column.databaseName}" ${type}${
            column.isNullable ? " NULL" : " NOT NULL"
          }${defaultClause}${defaultClauseValue}`;
        })
        .join(", ");

      const primaryColumns = entity.columns
        .filter((column) => column.isPrimary)
        .map((column) => `"${column.databaseName}"`);
      const primaryKey =
        primaryColumns.length > 0
          ? `, CONSTRAINT "PK_\${schema}\_${tableName}" PRIMARY KEY (${primaryColumns.join(
              ", "
            )})`
          : "";

      const indices = entity.indices
        .map((index) => {
          const indexType = index.isUnique ? "UNIQUE" : "";
          const indexName = index.name ? `CONSTRAINT "${index.name}" ` : "";
          const indexColumns = index.columns
            .map((col) => `"${col.databaseName}"`)
            .join(", ");
          return `${indexName}${
            indexType ? indexType + " " : ""
          }(${indexColumns})`;
        })
        .join(", ");

      const tableSQL = `await queryRunner.query(\`CREATE  TABLE "\${schema}"."${tableName}"(${columns}${primaryKey}${
        indices ? `, ${indices}` : ""
      });\`)`;
      migrationSQL.push(tableSQL);
    });
  });

  return migrationSQL.join("\n");
}

async function writeMigrationToFile() {
  const migrationSQL = await generateMigrationScript();

  const timestamp = new Date().getTime();
  const migrationFileName = `${timestamp}-AutoMigration.ts`;
  const migrationFilePath = `./migrations/${migrationFileName}`;

  const migrationContent = `
        import { MigrationInterface, QueryRunner } from "typeorm";
        import { PostgresQueryRunner } from 'typeorm/driver/postgres/PostgresQueryRunner';
        import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
        export class AutoMigration${timestamp} implements MigrationInterface {
        // eslint-disable-next-line @typescript-eslint/typedef
        name = "AutoMigration${timestamp}";

        public async up(queryRunner: PostgresQueryRunner): Promise<void> {
          const { schema } = queryRunner.connection.options as PostgresConnectionOptions;
          ${migrationSQL}
        }

        public async down(queryRunner: QueryRunner): Promise<void> {
            //tset
        }
        }

    `;

  //write migration file
  fs.writeFileSync(migrationFilePath, migrationContent);
  console.log(`Migration file generated: ${migrationFileName}`);
}

writeMigrationToFile();

// createConnection(connectionOptions)
//   .then(() => writeMigrationToFile())
//   .catch((error) => console.log(error));
