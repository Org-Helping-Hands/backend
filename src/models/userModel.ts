import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Token } from "./tokenModel";

@Entity()
export class User extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  phoneNumber: string;

  @OneToMany((type) => Token, (token) => token.user, { cascade: true })
  tokens: Token[];
}
