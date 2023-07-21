import { Test, TestingModule } from '@nestjs/testing';
import { BookingFlightService } from '../booking-flight.service';
import { BookingFlightModule } from '../booking-flight.module';
import { BookingEntity } from 'src/entities/booking.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mockBookingFlightCreated, standard_flight } from './__mock__';

describe('BookingFlightService ( UT )', () => {
  let bookingService: BookingFlightService;
  let bookingRepository: Repository<BookingEntity>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookingFlightService,
        {
          provide: getRepositoryToken(BookingEntity),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    bookingService = module.get<BookingFlightService>(BookingFlightService);
    bookingRepository = module.get<Repository<BookingEntity>>(
      getRepositoryToken(BookingEntity),
    );
  });

  it('bookingFlightService methods should be defined', () => {
    expect(bookingService).toBeDefined();
    expect(bookingService.createBooking).toBeDefined();
  });

  it('createBooking saved into the database', async () => {
    jest.spyOn(bookingRepository, 'save').mockResolvedValue({
      ...mockBookingFlightCreated,
    });

    const createdBooking = await bookingService.createBooking(
      standard_flight,
      standard_flight[3],
      mockBookingFlightCreated.requested_ip,
    );

    expect(createdBooking).toHaveProperty('standardItinerary', standard_flight);
    expect(createdBooking).toHaveProperty(
      'final_destination',
      mockBookingFlightCreated,
    );
  });
});
