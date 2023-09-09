import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateMediaDto {
    @ApiProperty({
        example: "Facebook",
        description: "title of media"
    })
    @IsString()
    @IsNotEmpty({
        message: "All fields are required!"
    })
    title: string;

    @ApiProperty({
        example: "giovannapox",
        description: "username"
    })
    @IsString()
    @IsNotEmpty({
        message: "All fields are required!"
    })
    username: string;
}
