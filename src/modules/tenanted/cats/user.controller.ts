import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./users.entity";
import { CatsService } from "./user.service";

@Controller("users")
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  create(@Body() createCatDto: CreateUserDto): Promise<User> {
    return this.catsService.create(createCatDto);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.catsService.findAll();
  }
}
