import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePublicationDto {
    @IsNumber()
    @IsNotEmpty({
        message: "All fields are required!"
    })
    mediaId: number;
    
    @IsNumber()
    @IsNotEmpty({
        message: "All fields are required!"
    })
    postId: number;

    @IsString()
    @IsNotEmpty({
        message: "All fields are required!"
    })
    date: Date;
}
