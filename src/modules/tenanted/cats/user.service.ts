import { Inject, Injectable } from "@nestjs/common";
import { Connection, Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./users.entity";
import { CONNECTION } from "../../tenancy/tenancy.symbols";

@Injectable()
export class CatsService {
  private readonly catsRepository: Repository<User>;

  constructor(@Inject(CONNECTION) connection: Connection) {
    this.catsRepository = connection.getRepository(User);
  }

  create(createCatDto: CreateUserDto): Promise<User> {
    const cat = new User();
    cat.name = createCatDto.name;

    return this.catsRepository.save(cat);
  }

  async findAll(): Promise<User[]> {
    return this.catsRepository.find();
  }
}
