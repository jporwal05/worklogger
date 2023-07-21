import { ObjectId } from 'mongodb';
import {
    Entity,
    ObjectIdColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryColumn,
    Index,
} from 'typeorm';

@Entity('worklog')
@Index(['date', 'username'], { unique: true })
export class Worklog {
    @ObjectIdColumn()
    _id: ObjectId;

    @Column({ type: 'date' })
    date: string;

    @Column()
    username: string;

    @Column()
    log: string[];

    @CreateDateColumn({ type: 'timestamp' })
    createdTime: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    modifiedTime: Date;

    @Column()
    createdBy: string;

    @Column()
    lastModifiedBy: string;
}
