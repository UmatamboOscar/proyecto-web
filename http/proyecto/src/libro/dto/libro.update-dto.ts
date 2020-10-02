import {IsAlpha, IsNumber, IsOptional, IsPositive, MaxLength, MinLength} from "class-validator";

export class LibroUpdateDto{

    @IsOptional()
    @IsAlpha()
    @MaxLength(60)
    @MinLength(3)
    titulo?:string;

    @IsOptional()
    @IsAlpha()
    @MaxLength(60)
    @MinLength(3)
    autor?:string;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    stock?:number;

}