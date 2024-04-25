import { AbstractEntity } from "../../../abstract.entity";
import { Column, Entity } from "typeorm";

@Entity({ name: "user" })
export class User extends AbstractEntity {
  @Column()
  name: string;
  @Column()
  age: number;
}
