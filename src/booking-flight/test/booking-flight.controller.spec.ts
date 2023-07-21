import { Test, TestingModule } from '@nestjs/testing';
import { BookingFlightController } from '../booking-flight.controller';
import { BookingFlightService } from '../booking-flight.service';
import {
  ANY_ERROR,
  mockBookingFlightCreated,
  mockClientBooking,
  standard_flight,
} from './__mock__';
import { BadRequestException } from '@nestjs/common';

describe('BookingFlightController ( UT )', () => {
  let bookingController: BookingFlightController;
  let bookingFlightService: BookingFlightService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookingFlightController],
      providers: [
        BookingFlightService,
        {
          provide: BookingFlightService,
          useValue: {
            createBooking: jest.fn(),
          },
        },
      ],
    }).compile();

    bookingController = module.get<BookingFlightController>(
      BookingFlightController,
    );
    bookingFlightService =
      module.get<BookingFlightService>(BookingFlightService);
  });

  it('bookingController methods should be defined', () => {
    expect(bookingController).toBeDefined();
    expect(bookingController.orderedItinerary).toBeDefined();
    expect(bookingController.create).toBeDefined();
  });

  it('Itinerary flight from client should be ordered success', async () => {
    const ordered = await bookingController.orderedItinerary({
      flights: mockClientBooking,
    });

    expect(ordered).toHaveLength(4);
    expect(ordered).toMatchObject(standard_flight);
  });

  it('Checking ip address before saving', async () => {
    await bookingController.create(
      {
        flights: mockClientBooking,
      },
      `::ffff:${mockBookingFlightCreated.requested_ip}`,
    );

    // Except original ip
    expect(mockBookingFlightCreated.requested_ip).toBe(
      mockBookingFlightCreated.requested_ip,
    );
  });

  it('create booking journey from client should be ordered success', async () => {
    jest
      .spyOn(bookingController, 'orderedItinerary')
      .mockResolvedValue(standard_flight);

    jest.spyOn(bookingFlightService, 'createBooking').mockResolvedValue({
      standardItinerary: standard_flight,
      final_destination: mockBookingFlightCreated,
    });

    const saved = await bookingController.create(
      {
        flights: mockClientBooking,
      },
      mockBookingFlightCreated.requested_ip,
    );

    expect(saved).toHaveProperty('standardItinerary', standard_flight);

    expect(saved).toHaveProperty('final_destination', mockBookingFlightCreated);
  });

  it('throw exception if have issue when ordered flight itinerary', async () => {
    jest
      .spyOn(bookingFlightService, 'createBooking')
      .mockRejectedValue(ANY_ERROR);

    await expect(
      bookingController.create(
        {
          flights: mockClientBooking,
        },
        mockBookingFlightCreated.requested_ip,
      ),
    ).rejects.toThrowError(new BadRequestException(ANY_ERROR));
  });
});
