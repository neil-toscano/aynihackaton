import { Post } from 'src/post/entities/post.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  fullName: string;

  @Column('text', {
    unique: true,
  })
  email: string;

  @Column('text', {
    nullable: true,
  })
  profilePicture: string;

  @Column('text', {
    nullable: true,
  })
  bio: string;

  @Column('text', { nullable: true })
  role: string; // Ej. "CEO & Founder"

  @Column('text', {
    nullable: true,
  })
  location: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column('text')
  password: string;

  @Column('text', {
    array: true,
    default: ['user'],
  })
  roles: string[];

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];
}
