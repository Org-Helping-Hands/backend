import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./userModel";

@Entity()
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @OneToMany((type) => NeededItem, (neededItem) => neededItem.post, {
    cascade: true,
  })
  neededItems: NeededItem[];

  @Column()
  latitude: string;

  @Column()
  longitude: string;

  @Column()
  description: string;

  @Column()
  latestOperation: "Completed" | "Started" | "Idle" = "Idle";

  @OneToOne((type) => User)
  operationPerformedBy: User;

  @ManyToOne((type) => User, (user) => user.posts)
  postedBy: User;
}

@Entity()
export class NeededItem extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  no: number;

  @Column()
  itemName: string;

  @ManyToOne((type) => Post, (post) => post.neededItems)
  post: Post;
}
