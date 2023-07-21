import { Module } from '@nestjs/common';
import { BookingFlightService } from './booking-flight.service';
import { BookingFlightController } from './booking-flight.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingEntity } from 'src/entities/booking.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BookingEntity])],
  controllers: [BookingFlightController],
  providers: [BookingFlightService],
})
export class BookingFlightModule {}
