import { ObjectId } from 'mongodb';
import {
    Entity,
    ObjectIdColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
    @ObjectIdColumn()
    _id: ObjectId;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdTime: number;

    @UpdateDateColumn({ type: 'timestamp' })
    modifiedTime: number;

    @Column()
    createdBy: string;

    @Column()
    lastModifiedBy: string;
}
