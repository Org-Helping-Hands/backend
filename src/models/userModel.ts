import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

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

@Entity()
export class Token extends BaseEntity {
  @PrimaryColumn({ length: 900 })
  token: string;

  @ManyToOne((type) => User, (user) => user.tokens)
  user: User;
}
