// const { createConnection, getConnectionOptions } = require("typeorm");
// const path = require("path");
// const fs = require("fs");
// // const Tenants = require("./modules/public/tenants/tenant.entity");
// async function analizeEntitySchema() {
//   const connectionOptions = {
//     type: "postgres",
//     host: "localhost",
//     port: 5432,
//     username: "postgres",
//     password: "postgres",
//     database: "nest-crud",
//     logging: true,
//     autoLoadEntities: true,
//     // synchronize: true,
//     entities: [
//       path.join(__dirname, "./modules/tenanted/**/*.entity{.ts,.js}"),
//       path.join(__dirname, "./modules/public/**/*.entity{.ts,.js}"),
//     ],
//     migrations: [path.join(__dirname, "./migrations/tenanted/*{.ts,.js}")],
//     cli: {
//       migrationsDir: "src/migrations/tenanted",
//     },
//   };

//   // const connectionOptions = await getConnectionOptions();
//   const connection = await createConnection({
//     ...connectionOptions,
//     name: "tempConnection",
//   });

//   const tenantRepo = connection.getRepository("Tenant");
//   const tenants = await tenantRepo.find();

//   const schema = new Map();

//   tenants.forEach((tenant) => {
//     const schemaName = `tenant_${tenant.id}`;
//     schema.set(schemaName, []);
//   });
//   connection.entityMetadatas.forEach((metadata) => {
//     const schemaName = metadata.schema || null;
//     if(sc)
//     const entities = schema.get(schemaName) || [];
//     console.log(entities, "metadata.schema");

//     entities.push(metadata);
//     schema.set(schemaName, entities);
//   });

//   await connection.close();
//   return schema;
// }

// //Generate Migration Script
// async function generateMigrationScript() {
//   const schema = await analizeEntitySchema();
//   const migrationSQL = [];

//   schema.forEach((entities, schemaName) => {
//     const createSchemaSQL = `'CREATE SCHEMA IF NOT EXISTS "${schemaName}";'`;
//     migrationSQL.push(createSchemaSQL);

//     entities.forEach((entity) => {
//       const tableName = entity.tableName;
//       const columns = entity.columns
//         .map((column) => {
//           return `"${column.databaseName}" ${column.type}${
//             column.default !== undefined ? `DEFAULT ${column.default}` : ""
//           }${column.isNullable ? " NULL" : "NOT NULL"}`;
//         })
//         .join(", ");

//       const primaryColumns = entity.columns
//         .filter((column) => column.isPrimary)
//         .map((column) => `"${column.databaseName}"`);
//       const primaryKey =
//         primaryColumns.length > 0
//           ? `, CONSTRAIN "PK_${schemaName}_${tableName}" PRIMARY KEY (${primaryColumns.join(
//               ", "
//             )})`
//           : "";

//       const indices = entity.indices
//         .map((index) => {
//           const indexType = index.isUnique ? "UNIQUE" : "";
//           const indexName = index.name ? `CONSTRAINT "${index.name}" ` : "";
//           const indexColumns = index.columns
//             .map((col) => `"${col.databaseName}"`)
//             .join(", ");
//           return `${indexName}${
//             indexType ? indexType + " " : ""
//           }(${indexColumns})`;
//         })
//         .join(", ");

//       const tableSQL = `'CREATE  TABLE "${schemaName}"."${tableName}"(${columns}${primaryKey}${
//         indices ? `, ${indices}` : ""
//       });'`;
//       migrationSQL.push(tableSQL);
//     });
//   });

//   return migrationSQL.join("\n");
// }

// async function writeMigrationToFile() {
//   const migrationSQL = await generateMigrationScript();

//   const timestamp = new Date().getTime();
//   const migrationFileName = `${timestamp}-AutoMigration.ts`;
//   const migrationFilePath = `./migrations/${migrationFileName}`;

//   const migrationContent = `
//         import { MigrationInterface, QueryRunner } from "typeorm";

//         export class AutoMigration${timestamp} implements MigrationInterface {
//         // eslint-disable-next-line @typescript-eslint/typedef
//         name = "AutoMigration${timestamp}";

//         public async up(queryRunner: QueryRunner): Promise<void> {
//            ${migrationSQL}
//         }

//         public async down(queryRunner: QueryRunner): Promise<void> {
//             //tset
//         }
//         }

//     `;

//   //write migration file
//   fs.writeFileSync(migrationFilePath, migrationContent);
//   console.log(`Migration file generated: ${migrationFileName}`);
// }

// writeMigrationToFile();

// // createConnection(connectionOptions)
// //   .then(() => writeMigrationToFile())
// //   .catch((error) => console.log(error));
