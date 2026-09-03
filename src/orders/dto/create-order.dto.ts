import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  Min,
} from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  eventName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsInt()
  @Min(1)
  quantity: number;
}