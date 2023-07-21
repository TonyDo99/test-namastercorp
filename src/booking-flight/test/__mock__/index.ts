import { faker } from '@faker-js/faker';

import { Journey } from 'src/booking-flight/dto/create-booking-flight.dto';
import {
  FROM_DESTINATIONS,
  TO_DESTINATIONS,
} from 'src/booking-flight/enum/destinations.enum';
import { BookingEntity } from 'src/entities/booking.entity';

/**
 * Ordered list of of flight itinerary
 */
export const standard_flight: Journey[] = [
  {
    from: FROM_DESTINATIONS.EZE,
    to: TO_DESTINATIONS.MIA,
  },
  {
    from: FROM_DESTINATIONS.MIA,
    to: TO_DESTINATIONS.SFO,
  },
  {
    from: FROM_DESTINATIONS.SFO,
    to: TO_DESTINATIONS.GRU,
  },
  {
    from: FROM_DESTINATIONS.GRU,
    to: TO_DESTINATIONS.SCL,
  },
];

/**
 * Unordered list of of flight itinerary
 */
export const mockClientBooking: Journey[] = [
  {
    from: FROM_DESTINATIONS.EZE,
    to: TO_DESTINATIONS.MIA,
  },
  {
    from: FROM_DESTINATIONS.SFO,
    to: TO_DESTINATIONS.GRU,
  },
  {
    from: FROM_DESTINATIONS.GRU,
    to: TO_DESTINATIONS.SCL,
  },
  {
    from: FROM_DESTINATIONS.MIA,
    to: TO_DESTINATIONS.SFO,
  },
];

/**
 * Mock value list of of flight itinerary after saved
 */
export const mockBookingFlightCreated: Omit<
  BookingEntity,
  'updated_at' | 'deleted_at'
> = {
  id: faker.string.uuid(),
  final_destination: TO_DESTINATIONS.SCL,
  requested_ip: faker.internet.ipv4(),
  created_at: faker.date.anytime(),
};

export const ANY_ERROR = faker.lorem.sentence();
