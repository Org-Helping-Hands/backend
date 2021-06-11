import { BaseEntity, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./userModel";

@Entity()
export class Token extends BaseEntity {
  @PrimaryColumn({ length: 200 })
  token: string;

  @ManyToOne((type) => User, (user) => user.tokens)
  user: User;
}
