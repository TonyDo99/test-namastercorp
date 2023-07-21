import { Exclude } from 'class-transformer';
import { TO_DESTINATIONS } from '../booking-flight/enum/destinations.enum';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class BookingEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'varchar', nullable: false })
  final_destination: TO_DESTINATIONS;

  @Column({ type: 'binary', length: 32, nullable: false })
  requested_ip: string;

  @CreateDateColumn()
  created_at: Date;

  @Exclude()
  @UpdateDateColumn()
  updated_at?: Date;

  @Exclude()
  @DeleteDateColumn()
  deleted_at?: Date;
}
