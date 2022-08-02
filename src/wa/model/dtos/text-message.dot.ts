import { IsString, MinLength, MaxLength } from 'class-validator';

export class TextMessageDto {
  @MinLength(10, { message: 'mobile number is too short' })
  @MaxLength(20, { message: 'mobile number is too long' })
  @IsString()
  mobileNumber: string;
  @MaxLength(200, { message: 'mobile number is too long' })
  @IsString()
  content: string;
}
