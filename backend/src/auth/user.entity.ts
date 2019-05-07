import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { AuthType } from './authType.enum';
import { UserRole } from './userRole.enum';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 120, unique: true })
    email: string;

    @Column({ length: 255, nullable: true })
    password?: string;

    @Column({ nullable: true })
    token?: string;

    @Column({ nullable: true })
    otherToken?: string;

    @Column()
    authType: AuthType;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({default: UserRole.DEFAULT})
    role: UserRole;
}