import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./users.entity";
import { CatsController } from "./user.controller";
import { CatsService } from "./user.service";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [CatsService],
  controllers: [CatsController],
})
export class CatsModule {}
