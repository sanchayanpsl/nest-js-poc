import { AbstractEntity } from "../../../abstract.entity";
import { Column, Entity } from "typeorm";

@Entity({ name: "address" })
export class Address extends AbstractEntity {
  @Column()
  name: string;
}
