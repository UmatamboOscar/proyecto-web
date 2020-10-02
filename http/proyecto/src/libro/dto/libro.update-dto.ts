import {
    IS_DECIMAL,
    IsAlpha, IsDateString, IsDecimal, IsIdentityCard,
    IsNotEmpty, IsNumber, IsNumberString, IsOptional,
    IsPositive, IsString, Length,
    MaxLength,
    MinLength
} from "class-validator";

export class LibroUpdateDto {

    @IsNotEmpty()
    @IsNumberString()
    ISBN: string;

    @IsOptional()
    @IsAlpha()
    @MaxLength(60)
    @MinLength(3)
    titulo?: string;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    stock?: number;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    precio: number;

    @IsOptional()
    @IsAlpha()
    imagen: string;

    @IsOptional()
    @IsString()
    descripcion: string;

}