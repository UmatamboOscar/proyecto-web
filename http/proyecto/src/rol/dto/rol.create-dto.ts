import {
    IS_DECIMAL,
    IsAlpha, IsDateString, IsDecimal, IsIdentityCard,
    IsNotEmpty, IsNumber, IsNumberString, IsOptional,
    IsPositive, Length,
    MaxLength,
    MinLength
} from "class-validator";

export class RolCreateDto{

    @IsOptional()
    @IsAlpha()
    @MaxLength(10)
    @MinLength(3)
    tipo?:string;

}