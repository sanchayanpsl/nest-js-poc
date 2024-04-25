import { AbstractEntity } from "../../../abstract.entity";
import { Column, Entity } from "typeorm";

@Entity({ name: "product" })
export class Product extends AbstractEntity {
  @Column()
  name: string;
}
