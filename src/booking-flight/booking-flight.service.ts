import { Injectable } from '@nestjs/common';
import { Journey } from './dto/create-booking-flight.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BookingEntity } from 'src/entities/booking.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BookingFlightService {
  constructor(
    @InjectRepository(BookingEntity)
    private readonly bookingRepository: Repository<BookingEntity>,
  ) {}

  async createBooking(
    ordered_client_booking: Journey[],
    { to }: Journey,
    ip: string,
  ): Promise<{
    standardItinerary: Journey[];
    final_destination: Omit<BookingEntity, 'updated_at' | 'deleted_at'>;
  }> {
    const set = this.bookingRepository.create({
      final_destination: to,
      requested_ip: ip === '::1' ? '127.0.0.1' : ip,
    });

    const final_destination = await this.bookingRepository.save(set);

    return { standardItinerary: ordered_client_booking, final_destination };
  }
}
