import {IsAlpha, IsOptional, MaxLength, MinLength} from "class-validator";

export class AutorUpdateDto{

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