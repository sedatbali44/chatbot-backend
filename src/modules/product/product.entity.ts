import { Entity, ObjectIdColumn, ObjectId, Column } from 'typeorm';

@Entity('products')
export class Product {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('float')
  price: number;

  @Column()
  userId: string;

  @Column()
  category: string;

  @Column({ type: 'date', default: () => new Date() })
  createdAt: Date;

  @Column({ type: 'date', default: () => new Date() })
  updatedAt: Date;
}
