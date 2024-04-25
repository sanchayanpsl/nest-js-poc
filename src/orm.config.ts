import { SnakeNamingStrategy } from "./snake-naming.strategy";

import { join } from "path";

module.exports = {
  type: "postgres",
  host: "10.0.0.5",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "nest_crud",
  namingStrategy: new SnakeNamingStrategy(),
  logging: true,
  autoLoadEntities: true,
  // synchronize:,
  entities: [join(__dirname, "./modules/public/**/*.entity{.ts,.js}")],
  migrations: [join(__dirname, "./migrations/public/*{.ts,.js}")],
};
