import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userName: string;

  @Column()
  email: string;

  @Column()
  text: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @Column({ nullable: true })
  attachmentPath: string;

  @ManyToOne((type) => Comment, (comment) => comment.replies, {
    nullable: true,
  })
  parentComment: Comment;

  @OneToMany((type) => Comment, (comment) => comment.parentComment)
  replies: Comment[];
}
