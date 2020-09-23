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
    IsInt,
    IsNotEmpty,
    IsNumber, IsPositive,

} from "class-validator";

export class DeberCreateDto {

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    @IsInt()
    valor1:number;

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    @IsInt()
    valor2:number;

}