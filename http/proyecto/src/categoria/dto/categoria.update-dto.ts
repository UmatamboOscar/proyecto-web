import {IsAlpha, IsOptional, MaxLength, MinLength} from "class-validator";

export class CategoriaUpdateDto{

    @IsOptional()
    @IsAlpha()
    @MaxLength(60)
    @MinLength(3)
    nombre?:string;
}