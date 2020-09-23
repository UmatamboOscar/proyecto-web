import {
    IS_DECIMAL,
    IsAlpha, IsDateString, IsDecimal, IsIdentityCard,
    IsNotEmpty, IsNumber, IsNumberString, IsOptional,
    IsPositive, Length,
    MaxLength,
    MinLength
} from "class-validator";

export class UsuarioCreateDto{

    @IsOptional()
    @IsAlpha()
    @MaxLength(60)
    @MinLength(3)
    nombre?:string;

    @IsOptional()
    @IsAlpha()
    @MaxLength(60)
    @MinLength(3)
    apellido?:string;

    @IsNotEmpty()
    @IsNumberString()
    @Length(10)
    cedula:string;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    sueldo?:number;

    @IsOptional()
    @IsDateString()
    fechaNacimiento?: string;

}