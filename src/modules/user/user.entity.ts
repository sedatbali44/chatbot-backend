import { Entity, ObjectIdColumn, ObjectId, Column } from 'typeorm';

@Entity('users')
export class User {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'date', default: () => new Date() })
  createdAt: Date;

  @Column({ type: 'date', default: () => new Date() })
  updatedAt: Date;
}
