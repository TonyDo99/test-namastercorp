import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayUnique,
  IsArray,
  IsEnum,
  IsInstance,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { FROM_DESTINATIONS, TO_DESTINATIONS } from '../enum/destinations.enum';

export class Journey {
  @IsNotEmpty()
  @IsString()
  @IsEnum(FROM_DESTINATIONS)
  from: FROM_DESTINATIONS;

  @IsNotEmpty()
  @IsString()
  @IsEnum(TO_DESTINATIONS)
  to: TO_DESTINATIONS;
}

export class CreateBookingFlightDto {
  @IsArray()
  @ArrayMaxSize(4)
  @ArrayMinSize(4)
  @ValidateNested({
    each: true,
  })
  @Type(() => Journey)
  @IsInstance(Journey, { each: true })
  @ArrayUnique<Journey>((u) => u.from)
  @ArrayUnique<Journey>((u) => u.to)
  flights: Journey[];
}
