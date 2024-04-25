import { AbstractEntity } from "../../../abstract.entity";
import { Column, Entity } from "typeorm";

@Entity({ name: "contact" })
export class Contact extends AbstractEntity {
  @Column()
  name: string;
}
