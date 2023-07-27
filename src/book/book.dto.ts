import { IsNumber, IsString, IsNotEmpty, IsArray, ArrayNotEmpty, IsUUID } from 'class-validator'


export class AddListDto {
    @IsString()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsArray()
    @ArrayNotEmpty()
    authors: Array<string>

    @IsNumber()
    @IsNotEmpty()
    userId: number

}


export class MoveToFavoriteDto {

    @IsString()
    @IsNotEmpty()
    @IsUUID()
    id: string;

    @IsNumber()
    @IsNotEmpty()
    user_id: number;
}


export class DeleteOneDto {
    @IsString()
    @IsUUID()
    @IsNotEmpty()
    id: string;

    @IsNumber()
    @IsNotEmpty()
    user_id: number
}