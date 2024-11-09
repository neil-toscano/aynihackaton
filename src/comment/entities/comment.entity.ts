import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Post } from 'src/post/entities/post.entity';
import { Marketing } from 'src/marketing/entities/marketing.entity';
import { Financiamiento } from 'src/financiamiento/entities/financiamiento.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.comments)
  user: User;

  @ManyToOne(() => Post, (post) => post.comments)
  post: Post;

  @ManyToOne(() => Marketing, (marketing) => marketing.comments)
  marketing: Marketing;

  @ManyToOne(() => Financiamiento, (financiamiento) => financiamiento.comments)
  financiamiento: Financiamiento;
}
