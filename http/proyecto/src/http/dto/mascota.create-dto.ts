//para el nombre
// @IsAlpha()
//@IsNotEmpty()
//@MinLength()
//@MaxLength()

//@IsBoolean()
//@IsEmpty()
//@IsInt()
//@IsPositive()
//@IsOptional()
//@IsNumber()

import {
    IsAlpha,
    IsBoolean,
    IsInt,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsPositive,
    MaxLength,
    MinLength
} from "class-validator";

export class MascotaCreateDto {

    @IsAlpha()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(60)
    nombre: string;

    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    edad: number;

    @IsNotEmpty()
    @IsBoolean()
    casada: boolean;

    @IsBoolean()
    @IsOptional()
    ligada?: boolean;

    @IsPositive()
    @IsNumber()
    @IsNotEmpty()
    peso: number;
}