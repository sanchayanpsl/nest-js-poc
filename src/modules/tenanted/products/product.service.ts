import { Inject, Injectable } from "@nestjs/common";
import { Connection, Repository } from "typeorm";
import { CreateProductDto } from "./dto/create-product.dto";
import { Product } from "./product.entity";
import { CONNECTION } from "../../tenancy/tenancy.symbols";

@Injectable()
export class ProductService {
  private readonly catsRepository: Repository<Product>;

  constructor(@Inject(CONNECTION) connection: Connection) {
    this.catsRepository = connection.getRepository(Product);
  }

  create(createCatDto: CreateProductDto): Promise<Product> {
    const cat = new Product();
    cat.name = createCatDto.name;

    return this.catsRepository.save(cat);
  }

  async findAll(): Promise<Product[]> {
    return this.catsRepository.find();
  }
}
