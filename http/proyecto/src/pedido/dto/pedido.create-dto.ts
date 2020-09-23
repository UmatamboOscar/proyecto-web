import {
    IS_DECIMAL,
    IsAlpha, IsBoolean, IsDateString, IsDecimal, IsIdentityCard,
    IsNotEmpty, IsNumber, IsNumberString, IsOptional,
    IsPositive, Length,
    MaxLength,
    MinLength
} from "class-validator";

export class AutorCreateDto{

@IsDateString()
    fecha?:string;

    @IsDecimal()
    @MaxLength(10)
    @MinLength(3)
    precio?:number;

    @IsBoolean()
    estado?:boolean;

}