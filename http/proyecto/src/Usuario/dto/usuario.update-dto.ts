import {
    IS_DECIMAL,
    IsAlpha, IsDateString, IsDecimal, IsEmail, IsIdentityCard,
    IsNotEmpty, IsNumber, IsNumberString, IsOptional,
    IsPositive, IsString, Length,
    MaxLength,
    MinLength
} from "class-validator";

export class UsuarioUpdateDto{

    @IsNotEmpty()
    @IsAlpha()
    @MaxLength(60)
    @MinLength(3)
    nombre:string;

    @IsNotEmpty()
    @IsAlpha()
    @MaxLength(60)
    @MinLength(3)
    apellido:string;

    @IsNotEmpty()
    @IsNumberString()
    @Length(10)
    cedula:string;

    @IsOptional()
    @IsNumberString()
    @MaxLength(10)
    @MinLength(9)
    telefono?:string;

    @IsOptional()
    @IsString()
    @MaxLength(100)
    domicilio?:string;

    @IsNotEmpty()
    @IsEmail()
    correo:string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password:string;

}