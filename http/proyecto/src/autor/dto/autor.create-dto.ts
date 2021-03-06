import {
    IS_DECIMAL,
    IsAlpha, IsDateString, IsDecimal, IsIdentityCard,
    IsNotEmpty, IsNumber, IsNumberString, IsOptional,
    IsPositive, Length,
    MaxLength,
    MinLength
} from "class-validator";

export class AutorCreateDto{

    @IsOptional()
    @IsAlpha()
    @MaxLength(60)
    @MinLength(3)
    nombre?:string;

    @IsOptional()
    @IsAlpha()
    @MaxLength(60)
    @MinLength(3)
    nacionalidad?:string;

    @IsOptional()
    @IsAlpha()
    @MaxLength(300)
    @MinLength(1)
    descripcion?:string;

    @IsOptional()
    @IsAlpha()
    @MaxLength(300)
    @MinLength(25)
    imagen?:string;


}