import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./userModel";

export type TLatestOperation = "Completed" | "Started" | "Idle";
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

  @Column({ default: "Idle" })
  latestOperation: TLatestOperation;

  @ManyToOne((type) => User)
  @JoinColumn()
  operationPerformedBy: User;

  @ManyToOne((type) => User, (user) => user.posts)
  postedBy: User;

  static async updatePost(id: string, keyValue: Partial<Post>) {
    let post = await Post.findOne(id);
    if (post) return Post.create({ ...post, ...keyValue }).save();
    else throw Error("Post not found");
  }
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
