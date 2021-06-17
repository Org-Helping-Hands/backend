import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from "typeorm";
import { Post } from "./postModel";
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

  @OneToMany((type) => Post, (post) => post.postedBy)
  posts: Post[];

  @OneToOne((type) => Post)
  @JoinColumn()
  currentHelpingPost: Post | null;

  @Column({ default: 0 })
  totalHelps: number;

  @Column({ default: 0 })
  totalPosts: number;

  @Column({ default: 0 })
  totalPostCompletedByOthers: number;

  @Column({ default: "" })
  emailId: string;

  @Column({ nullable: true })
  updateEmailOtp: number;

  @Column({ nullable: true })
  emailToUpdate: string;

  createOtp() {
    var val = Math.floor(1000 + Math.random() * 9000);
    this.updateEmailOtp = val;
    this.save();
    return val;
  }
}
