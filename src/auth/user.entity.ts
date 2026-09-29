import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('User')
export class User {
  @PrimaryGeneratedColumn()
  IdUser: number;

  @Column({ type: 'varchar', length: 255 })
  UserName: string;

  @Column({ type: 'varchar', length: 255 })
  Password: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  Token: string;
}
