import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
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

  @Column()
  currentPostHelpingId: string = "";

  @Column()
  totalHelps: number = 0;

  @Column()
  totalPosts: number = 0;

  @Column()
  totalPostCompletedByOthers: number = 0;

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
