import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  category: string;

  @Column('int')
  quantity: number;
}
