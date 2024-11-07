import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @Column('text')
  // title: string;

  @Column('text')
  content: string;

  @Column({ default: 0 })
  likes: number;

  @Column({ default: 0 })
  commentsCount: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column('text', { array: true, nullable: true })
  imageUrls: string[];

  @ManyToOne(() => User, (user) => user.posts)
  user: User;
}
