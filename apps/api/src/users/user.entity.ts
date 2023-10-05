import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    unique: true,
  })
  email!: string;

  @Column()
  passwordHash!: string;

  @Column()
  fullName!: string;
}
