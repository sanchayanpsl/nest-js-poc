import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { Product } from "./product.entity";
import { ProductService } from "./product.service";

@Controller("Products")
export class CatsController {
  constructor(private readonly catsService: ProductService) {}

  @Post()
  create(@Body() createCatDto: CreateProductDto): Promise<Product> {
    return this.catsService.create(createCatDto);
  }

  @Get()
  findAll(): Promise<Product[]> {
    return this.catsService.findAll();
  }
}
