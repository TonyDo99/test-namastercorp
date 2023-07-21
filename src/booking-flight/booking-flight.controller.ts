import {
  Controller,
  Post,
  Body,
  Ip,
  BadRequestException,
} from '@nestjs/common';

import { BookingFlightService } from './booking-flight.service';

import {
  CreateBookingFlightDto,
  Journey,
} from './dto/create-booking-flight.dto';

import { standard_flight } from './test/__mock__';

import { BookingEntity } from 'src/entities/booking.entity';

@Controller('booking-flight')
export class BookingFlightController {
  constructor(private readonly bookingFlightService: BookingFlightService) {}

  orderedItinerary(
    clientItinerary: CreateBookingFlightDto,
  ): Promise<Journey[]> {
    return Promise.resolve(
      standard_flight.map((flight: Journey) =>
        clientItinerary.flights.find(
          (booking: Journey) =>
            booking.from === flight.from && booking.to === flight.to,
        ),
      ),
    );
  }

  @Post()
  async create(
    @Body() createBookingFlightDto: CreateBookingFlightDto,
    @Ip() ip: string,
  ): Promise<{
    standardItinerary: Journey[];
    final_destination: Omit<BookingEntity, 'updated_at' | 'deleted_at'>;
  }> {
    try {
      // Checking ip
      if (ip.includes('::ffff:')) {
        ip = ip.substring(7);
      }

      const ordered_client_booking = await this.orderedItinerary(
        createBookingFlightDto,
      );

      const lastJourney =
        ordered_client_booking[ordered_client_booking.length - 1];

      const booking = await this.bookingFlightService.createBooking(
        ordered_client_booking,
        lastJourney,
        ip,
      );

      const [_, booked] = await Promise.all([ordered_client_booking, booking]);

      return booked;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
