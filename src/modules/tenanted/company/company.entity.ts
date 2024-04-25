import { AbstractEntity } from "../../../abstract.entity";
import { Column, Entity } from "typeorm";

@Entity({ name: "company" })
export class Company extends AbstractEntity {
  @Column()
  name: string;
  age: BigInt;
}
