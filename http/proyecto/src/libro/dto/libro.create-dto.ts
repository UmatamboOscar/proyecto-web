import {
    IS_DECIMAL,
    IsAlpha, IsDateString, IsDecimal, IsIdentityCard,
    IsNotEmpty, IsNumber, IsNumberString, IsOptional,
    IsPositive, IsString, Length,
    MaxLength,
    MinLength
} from "class-validator";
import {Column} from "typeorm";

export class LibroCreateDto {

    @IsNotEmpty()
    @IsNumberString()
    ISBN: string;

    @IsOptional()
    @IsString()
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
    @IsString()
    imagen: string;

    @IsOptional()
    @IsString()
    descripcion: string;

}