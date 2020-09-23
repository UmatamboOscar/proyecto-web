import {
    IS_DECIMAL,
    IsAlpha, IsDateString, IsDecimal, IsIdentityCard,
    IsNotEmpty, IsNumber, IsNumberString, IsOptional,
    IsPositive, Length,
    MaxLength,
    MinLength
} from "class-validator";

export class LibroCreateDto{

    @IsOptional()
    @IsAlpha()
    @MaxLength(60)
    @MinLength(3)
    titulo?:string;

    @IsOptional()
    @IsAlpha()
    @MaxLength(60)
    @MinLength(3)
    autor?:string;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    stock?:number;

}