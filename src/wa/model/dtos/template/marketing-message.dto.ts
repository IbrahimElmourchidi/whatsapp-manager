import { IsString, MaxLength, MinLength } from 'class-validator';

export class MarketingTemplateDto {
  @MinLength(10, { message: 'mobile number is too short' })
  @MaxLength(20, { message: 'mobile number is too long' })
  @IsString()
  mobileNumber: string;
  @MaxLength(100, { message: 'file name is too long' })
  @IsString()
  productName: string;
  @MaxLength(200)
  @IsString()
  imageUrl: string;
}
