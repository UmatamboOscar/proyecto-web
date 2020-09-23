import {IsAlpha, IsNotEmpty, MaxLength, MinLength} from "class-validator";
export class DeberUsrCreateDto {

    @IsAlpha()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(60)
    username: string;
}